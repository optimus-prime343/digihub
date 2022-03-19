import { Button, TextInput } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import { randQuote, randUuid } from '@ngneat/falso'
import classNames from 'classnames'
import { format } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { FormEvent, useEffect, useRef, useState } from 'react'

import { MessageList } from '@/features/chat'
import { useUser } from '@/hooks/auth'
import { useMessages } from '@/hooks/chat'
import { IMessage } from '@/types/message'
import { IUser } from '@/types/user'
import { getProfileImageUrl } from '@/utils/getImageUrl'
import { socket } from '@/utils/socket'
import { playMessageReceivedSound, playMessageSentSound } from '@/utils/sounds'

const ChatTest = () => {
  const router = useRouter()
  const { showNotification } = useNotifications()
  const messagesRef = useRef<HTMLDivElement | null>(null)
  const { user } = useUser()

  const receiverId = router.query.receiver as string | undefined

  const { data: initialMessages = [] } = useMessages(receiverId)
  const [message, setMessage] = useState(randQuote())
  const [messages, setMessages] = useState<IMessage[]>(initialMessages)

  const messageClass = (senderId: string) =>
    classNames('px-4 py-2 max-w-xs rounded-md', {
      'bg-indigo-600 ml-auto rounded-tr-none': user?.id === senderId,
      'bg-gray-500 rounded-tl-none mr-auto': user?.id !== senderId,
    })
  const messageItem = (senderId: string) =>
    classNames('flex flex-col', {
      'items-end px-4': user?.id === senderId,
      'items-start': user?.id !== senderId,
    })
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!receiverId)
      return showNotification({ message: 'Receiver id is required' })
    const newMessage: IMessage = {
      id: randUuid(),
      sender: user as IUser,
      recipient: receiverId,
      content: message,
      createdAt: new Date(),
    }
    setMessages(previousMessages => [...previousMessages, newMessage])
    socket.emit('message', newMessage)
    setMessage('')
    playMessageSentSound()
  }
  useEffect(() => {
    socket.on('message', (message: IMessage) => {
      playMessageReceivedSound()
      setMessages(previousMessages => [...previousMessages, message])
    })
  }, [])
  useEffect(() => {
    if (messagesRef.current) {
      // when a new message is added, scroll to the bottom of newly added message
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight * 2
    }
  }, [messages])
  useEffect(() => {
    setMessages(initialMessages)
  }, [initialMessages])
  return (
    <div className='mx-auto my-4 max-w-lg rounded-md bg-gray-600 p-4'>
      <div className='max-h-96 space-y-4 overflow-y-scroll' ref={messagesRef}>
        {messages.map((message, index) => (
          <div className={messageItem(message.sender.id)} key={index}>
            <div className='flex flex-row-reverse items-start gap-2'>
              <Image
                alt={message.sender.id}
                className='rounded-full'
                height={50}
                src={getProfileImageUrl(message.sender.image)}
                width={50}
              />
              <p className={messageClass(message.sender.id)}>
                {message.content}
              </p>
            </div>
            <p className='text-gray-200'>
              {format(new Date(message.createdAt), 'p')}
            </p>
          </div>
        ))}
      </div>
      <form className='mt-4 flex items-center gap-2' onSubmit={handleSubmit}>
        <TextInput
          className='flex-1'
          onChange={event => setMessage(event.currentTarget.value)}
          placeholder='Send Message'
          value={message}
        />
        <Button type='submit' variant='outline'>
          Send Message
        </Button>
      </form>
    </div>
  )
}

export default ChatTest
