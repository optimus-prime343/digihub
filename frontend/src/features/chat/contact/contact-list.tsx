import { Alert } from '@mantine/core'
import { useRouter } from 'next/router'

import { useUser } from '@/hooks/auth'
import { useContacts } from '@/hooks/chat'
import { UserRole } from '@/types/user'

import { ContactItem } from './contact-item'

export const ContactList = () => {
  const router = useRouter()
  const { user } = useUser()
  const { data: contacts } = useContacts()

  if (contacts.length === 0)
    return (
      <Alert>
        You haven&apos;t {user?.role === UserRole.USER ? 'sent' : 'received'}{' '}
        any messages yet
      </Alert>
    )
  return (
    <div className='flex items-start gap-6'>
      <div className='sticky top-4 w-full max-w-sm space-y-4 overflow-hidden'>
        {contacts.map(contact => (
          <ContactItem
            contact={contact}
            key={contact.recipientId}
            onClick={() =>
              router.push({
                pathname: '/chat-test',
                query: { receiverId: contact.recipientId },
              })
            }
          />
        ))}
      </div>
    </div>
  )
}
