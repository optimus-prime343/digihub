import classNames from 'classnames'
import { format } from 'date-fns'
import Image from 'next/image'

import { IContact } from '@/types/contact'

interface Props {
  contact: IContact
  isChatWindowOpen: boolean
  onClick: () => void
}
export const ContactItem = ({ contact, onClick, isChatWindowOpen }: Props) => {
  const contactItem = classNames(
    'border border-transparent flex items-start gap-4 p-2 rounded-md text-white hover:cursor-pointer hover:bg-gray-500',
    {
      'bg-white text-gray-900 hover:bg-white': isChatWindowOpen,
    }
  )
  return (
    <div className={contactItem} onClick={onClick}>
      <Image
        alt={`${contact.userName}`}
        className='rounded-full'
        height={50}
        objectFit='cover'
        src={contact.image}
        width={50}
      />
      <div className='flex-1'>
        <p className='flex justify-between'>
          <span className='text-lg font-bold'>{contact.userName}</span>
          <span>{format(new Date(contact.lastMessageDate), 'p')}</span>
        </p>
        <span className='divider my-2' />
        <p className='w-56'>
          {contact.lastMessage.length > 50
            ? `${contact.lastMessage.slice(0, 50)}....`
            : contact.lastMessage}
        </p>
      </div>
    </div>
  )
}
