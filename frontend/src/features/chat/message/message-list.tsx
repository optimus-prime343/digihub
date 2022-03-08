import { HTMLAttributes } from 'react'

import { IMessage } from '@/types/message'

import { AddMessageForm } from '../add-message-form'
import { MessageItem } from './message-item'

interface Props extends HTMLAttributes<HTMLDivElement> {
  messages: IMessage[]
}
export const MessageList = ({ messages, style }: Props) => {
  return (
    <div className='max-w-2xl flex-1 rounded-md bg-gray-600 p-4' style={style}>
      <div className='flex flex-col gap-4 rounded-md bg-gray-600'>
        {messages.map(message => (
          <MessageItem key={message.id} message={message} />
        ))}
      </div>
      <AddMessageForm />
    </div>
  )
}
