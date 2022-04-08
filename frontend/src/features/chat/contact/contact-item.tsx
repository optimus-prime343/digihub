import Image from 'next/image'

import { IContact } from '@/types/contact'
import { getProfileImageUrl } from '@/utils/getImageUrl'

interface Props {
  contact: IContact
  onClick: () => void
}
export const ContactItem = ({ contact, onClick }: Props) => {
  return (
    <div
      className='flex cursor-pointer items-start gap-4 p-2 hover:rounded-md hover:bg-gray-600 hover:shadow-md'
      onClick={onClick}
    >
      <Image
        alt={`${contact.username}`}
        className='rounded-full'
        height={50}
        objectFit='cover'
        src={getProfileImageUrl(contact.image)}
        width={50}
      />
      <p className='text-2xl font-bold'>{contact.username}</p>
    </div>
  )
}
