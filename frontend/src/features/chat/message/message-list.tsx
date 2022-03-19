import { HTMLAttributes, useEffect, useRef, useState } from 'react'

import { IMessage } from '@/types/message'
import { socket } from '@/utils/socket'

import { AddMessageForm } from '../add-message-form'
import { MessageItem } from './message-item'

interface Props extends HTMLAttributes<HTMLDivElement> {
  initialMessages: IMessage[]
  recipient: string
}
export const MessageList = ({ recipient, initialMessages, style }: Props) => {
  const [messages, setMessages] = useState<IMessage[]>(initialMessages)
  const messageContainer = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    socket.on('message', (message: IMessage) => {
      console.log('message', message)
      setMessages(previousMessages => [...previousMessages, message])
    })
  }, [])
  useEffect(() => {
    if (!messageContainer.current) return
    // automatically scroll to the bottom of the message list
    messageContainer.current.scrollTop = messageContainer.current.scrollHeight
  }, [messages])
  return (
    <div className='flex-1 rounded-md bg-gray-600 p-4' style={style}>
      <div
        className='mb-4 flex max-h-[25rem] flex-col gap-4 overflow-y-scroll rounded-md'
        ref={messageContainer}
      >
        {messages.map(message => (
          <MessageItem key={message.id} message={message} />
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
