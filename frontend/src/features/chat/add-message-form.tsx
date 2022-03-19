import { Button, TextInput } from '@mantine/core'
import { randUuid } from '@ngneat/falso'
import { FormEvent, useState } from 'react'
import { BiMessage, BiSend } from 'react-icons/bi'

import { useUser } from '@/hooks/auth'
import { IMessage } from '@/types/message'
import { IUser } from '@/types/user'
import { socket } from '@/utils/socket'

interface Props {
  recipient: string
  onSend: (newMessage: IMessage) => void
}
export const AddMessageForm = ({ recipient, onSend }: Props) => {
  const { user } = useUser()
  const [message, setMessage] = useState('')
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (message) {
      const newMessage: IMessage = {
        id: randUuid(),
        recipient,
        content: message,
        sender: user as IUser,
        createdAt: new Date(),
      }
      onSend(newMessage)
      socket.emit('message', newMessage)
      setMessage('')
    }
  }
  return (
    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
      <TextInput
        className='flex-1'
        icon={<BiMessage />}
        onChange={event => setMessage(event.currentTarget.value)}
        placeholder='Send Message'
        value={message}
      />
      <Button className='bg-indigo-600' leftIcon={<BiSend />} type='submit'>
        Send
      </Button>
    </form>
  )
}
