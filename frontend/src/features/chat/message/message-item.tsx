import classNames from 'classnames'
import { format } from 'date-fns'
import Image from 'next/image'

import { useUser } from '@/hooks/auth'
import { IMessage } from '@/types/message'

interface Props {
  message: IMessage
}
export const MessageItem = ({ message }: Props) => {
  const { user } = useUser()
  // style for message item based on whether it is sent by current user or not
  const textClass = classNames('px-4 py-2 rounded-md max-w-sm', {
    'bg-indigo-600 justify-end rounded-tr-none': message.author.id === user?.id,
    'bg-gray-500 rounded-tl-none': message.author.id !== user?.id,
  })
  const messageItem = classNames('flex max-w-fit items-start gap-4', {
    'ml-auto flex-row-reverse': message.author.id === user?.id,
    'mr-auto flex-row': message.author.id !== user?.id,
  })
  return (
    <div className={messageItem}>
      <Image
        alt={`${message.author.id}`}
        className='rounded-full '
        height={50}
        objectFit='cover'
        src={message.author.image}
        width={50}
      />
      <p className={textClass}>{message.text}</p>
      <p className='self-center text-gray-200'>
        {format(new Date(message.createdAt), 'p')}
      </p>
    </div>
  )
}
