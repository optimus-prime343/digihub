import { Alert, Transition } from '@mantine/core'
import { useClickOutside } from '@mantine/hooks'
import { useEffect, useMemo, useState } from 'react'

import { useUser } from '@/hooks/auth'
import { useContacts, useMessages } from '@/hooks/chat'
import { UserRole } from '@/types/user'

import { MessageList } from '../message/message-list'
import { ContactItem } from './contact-item'
import { SearchContacts } from './search-contacts'

export const ContactList = () => {
  const { user } = useUser()
  const { data: contacts = [] } = useContacts()
  const [receiverId, setReceiverId] = useState<string | undefined>()
  const [query, setQuery] = useState('')

  const filteredContacts = useMemo(
    () =>
      query
        ? contacts.filter(contact =>
            contact.username.toLowerCase().includes(query.toLowerCase())
          )
        : contacts,
    [contacts, query]
  )
  const { data: messages = [], refetch } = useMessages(receiverId)

  // automatically close the messages container when clicked outside
  const containerRef = useClickOutside(() => setReceiverId(undefined))

  useEffect(() => {
    // fetch messages whenever their is receiver or receiver changes
    if (receiverId) refetch()
  }, [receiverId, refetch])

  if (contacts.length === 0)
    return (
      <Alert>
        You haven&apos;t {user?.role === UserRole.USER ? 'sent' : 'received'}{' '}
        any messages yet
      </Alert>
    )
  return (
    <div className='flex items-start gap-6' ref={containerRef}>
      <div className='sticky top-4 w-full max-w-sm space-y-4 overflow-hidden rounded-md bg-gray-600 p-2'>
        <SearchContacts onSearch={value => setQuery(value)} />
        {filteredContacts.map(contact => (
          <ContactItem
            contact={contact}
            isChatWindowOpen={receiverId === contact.id}
            key={contact.id}
            onClick={() => setReceiverId(contact.id)}
          />
        ))}
      </div>
      {user && receiverId ? (
        <Transition mounted={Boolean(receiverId)} transition='pop-bottom-left'>
          {style => (
            <MessageList
              initialMessages={messages}
              recipient={receiverId}
              style={style}
            />
          )}
        </Transition>
      ) : null}
    </div>
  )
}
