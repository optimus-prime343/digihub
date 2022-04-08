import { Button, Center, PasswordInput, TextInput } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

import { useLogin } from '../hooks/use-login'

interface Props {
  // page to redirect to after successful login
  redirectTo?: string
}

export const LoginForm = ({ redirectTo }: Props) => {
  const { showNotification } = useNotifications()
  const router = useRouter()
  const [username, setUsername] = useState('Isabel.Ren')
  const [password, setPassword] = useState('Sachin123@')

  const login = useLogin()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await login({ username, password })
      showNotification({ message: 'Login successful' })
      router.push(redirectTo ?? '/')
    } catch (error: any) {
      showNotification({
        title: 'Login Failed',
        message: error.message,
        color: 'red',
      })
    }
  }
  return (
    <Center className='min-h-screen'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-sm rounded-md bg-gray-600 p-4'
      >
        <TextInput
          label='Username'
          placeholder='Johndoe123'
          value={username}
          onChange={event => setUsername(event.currentTarget.value)}
        />
        <PasswordInput
          label='Password'
          placeholder='********'
          value={password}
          onChange={event => setPassword(event.currentTarget.value)}
          my='sm'
        />
        <Button type='submit' fullWidth>
          Login
        </Button>
      </form>
    </Center>
  )
}
