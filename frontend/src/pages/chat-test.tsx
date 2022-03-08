import { Button, TextInput } from '@mantine/core'
import { randQuote, randUuid } from '@ngneat/falso'
import classNames from 'classnames'
import { format } from 'date-fns'
import React, { FormEvent, useEffect, useMemo, useRef, useState } from 'react'

import { socket } from '@/utils/socket'
import { playMessageReceivedSound, playMessageSentSound } from '@/utils/sounds'

interface IMessage {
  message: string
  userId: string
  createdAt: number
}

const ChatTest = () => {
  const messagesRef = useRef<HTMLDivElement | null>(null)
  const userId = useMemo(() => randUuid(), [])
  const [message, setMessage] = useState(randQuote())
  const [messages, setMessages] = useState<IMessage[]>([])
  const messageClass = (senderId: string) =>
    classNames('px-4 py-2 max-w-xs rounded-md', {
      'bg-indigo-600 ml-auto rounded-tr-none': userId === senderId,
      'bg-gray-500 rounded-tl-none mr-auto': userId !== senderId,
    })
  const messageItem = (senderId: string) =>
    classNames('flex flex-col', {
      'items-end px-4': userId === senderId,
      'items-start': userId !== senderId,
    })
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (message) {
      setMessages(previousMessages => [
        ...previousMessages,
        { userId, message, createdAt: Date.now() },
      ])
      setMessage(randQuote())
      socket.emit('message', { message, userId, createdAt: Date.now() })
      playMessageSentSound()
    }
  }
  useEffect(() => {
    socket.on('message', (message: IMessage) => {
      playMessageReceivedSound()
      setMessages(previousMessages => [...previousMessages, message])
    })
  }, [userId])
  useEffect(() => {
    if (messagesRef.current) {
      // when a new message is added, scroll to the bottom of newly added message
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight * 2
    }
  }, [messages])
  return (
    <div className='mx-auto my-4 max-w-lg rounded-md bg-gray-600 p-4'>
      <div className='max-h-96 space-y-4 overflow-y-scroll' ref={messagesRef}>
        {messages.map((message, index) => (
          <div className={messageItem(message.userId)} key={index}>
            <p className={messageClass(message.userId)}>{message.message}</p>
            <p className='text-gray-200'>{format(message.createdAt, 'p')}</p>
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
      <p>UserId : {userId}</p>
    </div>
  )
}

export default ChatTest
