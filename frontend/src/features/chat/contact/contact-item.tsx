import classNames from 'classnames'
import { format } from 'date-fns'
import Image from 'next/image'

import { IContact } from '@/types/contact'
import { getProfileImageUrl } from '@/utils/getImageUrl'

interface Props {
  contact: IContact
  selectedRecipientId?: string
  onClick: () => void
}
export const ContactItem = ({
  contact,
  selectedRecipientId,
  onClick,
}: Props) => {
  const contactItem = classNames(
    'flex cursor-pointer items-start gap-4 p-2 hover:rounded-md hover:bg-gray-600 hover:shadow-md',
    {
      'bg-indigo-600 rounded-md hover:bg-indigo-700':
        selectedRecipientId === contact.recipientId,
    }
  )
  return (
    <div className={contactItem} onClick={onClick}>
      <Image
        alt={`${contact.username}`}
        className='rounded-full'
        height={50}
        objectFit='cover'
        src={getProfileImageUrl(contact.image)}
        width={50}
      />
      <div className='flex-1 space-y-1'>
        <p className='text-2xl font-bold'>{contact.username}</p>
        {contact.lastMessage && (
          <p>
            {contact.lastMessage.length > 80
              ? contact.lastMessage.slice(0, 80)
              : contact.lastMessage}
          </p>
        )}
        {contact.lastMessageDate && (
          <p>{format(new Date(contact.lastMessageDate), 'p')}</p>
        )}
      </div>
    </div>
  )
}
