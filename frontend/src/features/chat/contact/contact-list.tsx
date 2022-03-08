import { Transition } from '@mantine/core'
import { useClickOutside } from '@mantine/hooks'
import { useState } from 'react'

import { useUser } from '@/hooks/auth'
import { useContacts, useMessages } from '@/hooks/chat'

import { MessageList } from '../message/message-list'
import { ContactItem } from './contact-item'

export const ContactList = () => {
  const [receiverId, setReceiverId] = useState<string | undefined>()
  const { user } = useUser()
  const { data: contacts } = useContacts()
  const { data: messages } = useMessages(user?.id, receiverId)
  const containerRef = useClickOutside(() => setReceiverId(undefined))
  return (
    <div className='flex items-start gap-6' ref={containerRef}>
      <div className='sticky top-4 w-full max-w-sm space-y-4 overflow-hidden rounded-md bg-gray-600 p-2'>
        {(contacts ?? []).map(contact => (
          <ContactItem
            contact={contact}
            isChatWindowOpen={receiverId === contact.id}
            key={contact.id}
            onClick={() => setReceiverId(contact.id)}
          />
        ))}
      </div>
      <Transition mounted={Boolean(receiverId)} transition='pop-bottom-left'>
        {style => <MessageList messages={messages ?? []} style={style} />}
      </Transition>
    </div>
  )
}
