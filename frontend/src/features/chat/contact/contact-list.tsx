import { Transition } from '@mantine/core'
import { useClickOutside } from '@mantine/hooks'
import {
  randImg,
  randNumber,
  randPastDate,
  randQuote,
  randUserName,
  randUuid,
} from '@ngneat/falso'
import { useCallback, useMemo, useState } from 'react'

import { useUser } from '@/hooks/auth'
import { IContact } from '@/types/contact'
import { IMessage } from '@/types/message'
import { IUser } from '@/types/user'

import { MessageList } from '../message/message-list'
import { ContactItem } from './contact-item'
import { SearchContacts } from './search-contacts'

export const ContactList = () => {
  const { user } = useUser()
  const [contacts, setContacts] = useState<IContact[]>(DUMMY_CONTACTS)
  const messages = useMemo(() => generate_dummy_messages(user as IUser), [user])
  const [receiverId, setReceiverId] = useState<string | undefined>()
  const containerRef = useClickOutside(() => setReceiverId(undefined))

  const handleContactsSearch = useCallback(
    (query: string) =>
      setContacts(previousContacts =>
        query
          ? previousContacts.filter(contact =>
              contact.userName.toLowerCase().includes(query.toLowerCase())
            )
          : DUMMY_CONTACTS
      ),
    []
  )
  return (
    <div className='flex items-start gap-6' ref={containerRef}>
      <div className='sticky top-4 w-full max-w-sm space-y-4 overflow-hidden rounded-md bg-gray-600 p-2'>
        <SearchContacts onSearch={handleContactsSearch} />
        {contacts.map(contact => (
          <ContactItem
            contact={contact}
            isChatWindowOpen={receiverId === contact.id}
            key={contact.id}
            onClick={() => setReceiverId(contact.id)}
          />
        ))}
      </div>
      {user && (
        <Transition mounted={Boolean(receiverId)} transition='pop-bottom-left'>
          {style => <MessageList messages={messages} style={style} />}
        </Transition>
      )}
    </div>
  )
}
const DUMMY_CONTACTS: IContact[] = Array.from<IContact[]>({ length: 6 })
  .map((_, index) => index)
  .map(() => ({
    id: randUuid(),
    image: randImg(),
    lastMessage: randQuote(),
    lastMessageDate: randPastDate(),
    userName: randUserName(),
  }))

const generate_dummy_messages = (user: IUser) =>
  Array.from<IMessage>({ length: 50 })
    .map((_, index) => index)
    .map(() => ({
      author:
        randNumber({ min: 1, max: 10 }) % 2 === 0
          ? { ...user, image: randImg() }
          : { ...user, id: randUuid(), image: randImg() },
      createdAt: randPastDate(),
      id: randUuid(),
      text: randQuote(),
      receiverId: randUuid(),
    }))
