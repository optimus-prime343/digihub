import { HTMLAttributes, useEffect, useRef } from 'react'

import { IMessage } from '@/types/message'

import { AddMessageForm } from '../add-message-form'
import { MessageItem } from './message-item'

interface Props extends HTMLAttributes<HTMLDivElement> {
  messages: IMessage[]
}
export const MessageList = ({ messages, style }: Props) => {
  const messageContainer = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!messageContainer.current) return
    // automatically scroll to the bottom of the message list
    messageContainer.current.scrollTop = messageContainer.current.scrollHeight
  }, [])
  return (
    <div className='max-w-2xl flex-1 rounded-md bg-gray-600 p-4' style={style}>
      <div
        className='mb-4 flex max-h-[35rem] flex-col gap-4 overflow-y-scroll rounded-md'
        ref={messageContainer}
      >
        {messages.map(message => (
          <MessageItem key={message.id} message={message} />
        ))}
      </div>
      <AddMessageForm />
    </div>
  )
}
