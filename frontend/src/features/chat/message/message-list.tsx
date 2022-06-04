import { randUuid } from '@ngneat/falso'
import Image from 'next/image'
import { HTMLAttributes, useEffect, useRef, useState } from 'react'

import { useMessages } from '@/hooks/chat'
import { IMessage } from '@/types/message'
import { socket } from '@/utils/socket'

import { AddMessageForm } from '../add-message-form'
import { MessageItem } from './message-item'

interface Props extends HTMLAttributes<HTMLDivElement> {
  recipient: string
}
export const MessageList = ({ recipient, style }: Props) => {
  const { data } = useMessages(recipient)
  const [messages, setMessages] = useState<IMessage[]>(() => data ?? [])
  const messageContainer = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handler = (message: IMessage) => {
      setMessages(oldMessages => [...oldMessages, message])
    }
    socket.on('message', handler)
    return () => {
      socket.off('message', handler)
    }
  }, [])
  useEffect(() => {
    // every time a new message list is fetched set the messages to the new messages
    setMessages(data ?? [])
  }, [data])
  useEffect(() => {
    if (!messageContainer.current) return
    // automatically scroll to the bottom of the message list
    messageContainer.current.scrollTop = messageContainer.current.scrollHeight
  }, [messages])
  return (
    <div className='flex-1 rounded-md bg-gray-600 p-4' style={style}>
      {messages.length === 0 && (
        <Image
          alt='Begin your conversation'
          height={400}
          src='/images/chat.svg'
          width={400}
        />
      )}
      <div
        className='mb-4 flex max-h-[25rem] flex-col gap-4 overflow-y-scroll rounded-md'
        ref={messageContainer}
      >
        {messages.map(message => (
          <MessageItem key={randUuid()} message={message} />
        ))}
      </div>
      <AddMessageForm
        onSend={newMessage =>
          setMessages(previousMessage => [...previousMessage, newMessage])
        }
        recipient={recipient}
      />
    </div>
  )
}
