import { Button, TextInput } from '@mantine/core'
import { BiMessage, BiSend } from 'react-icons/bi'

export const AddMessageForm = () => {
  return (
    <div className='flex items-center gap-2'>
      <TextInput
        className='flex-1'
        icon={<BiMessage />}
        placeholder='Send Message'
      />
      <Button className='bg-indigo-600' leftIcon={<BiSend />}>
        Send
      </Button>
    </div>
  )
}
