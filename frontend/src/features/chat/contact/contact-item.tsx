import classNames from 'classnames'
import { format } from 'date-fns'
import Image from 'next/image'

import { IContact } from '@/types/contact'
import { getProfileImageUrl } from '@/utils/getImageUrl'

interface Props {
  contact: IContact
  isChatWindowOpen: boolean
  onClick: () => void
}
export const ContactItem = ({ contact, onClick, isChatWindowOpen }: Props) => {
  const contactItem = classNames(
    'border border-transparent flex items-start gap-4 p-2 rounded-md text-white hover:cursor-pointer hover:bg-gray-500',
    {
      'border border-indigo-600': isChatWindowOpen,
    }
  )
  return (
    <div className={contactItem} key={contact.id} onClick={onClick}>
      <Image
        alt={`${contact.userName}`}
        className='rounded-full'
        height={50}
        objectFit='cover'
        src={getProfileImageUrl(contact.image)}
        width={50}
      />
      <div className='flex-1'>
        <p className='flex justify-between'>
          <span className='text-lg font-bold'>{contact.userName}</span>
          <span>{format(new Date(contact.lastMessageDate), 'p')}</span>
        </p>
        <span className='divider my-2' />
        <p>
          {contact.lastMessage.length > 15
            ? `${contact.lastMessage.slice(0, 15)}....`
            : contact.lastMessage}
        </p>
      </div>
    </div>
  )
}
