import { Button, TextInput } from '@mantine/core'
import { useRouter } from 'next/router'
import React, { FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { useAuth } from '~context/auth'
import { axiosClient } from '~utils/axiosClient'

const handlePasswordResetRequest = async (
  event: FormEvent<HTMLFormElement>,
  email: string
) => {
  event.preventDefault()
  if (!email) return toast.error('Email address can"t be empty')
  const response = axiosClient.post<string>('/auth/request-password-reset', {
    email,
  })
  toast.promise(response, {
    loading: 'Sending password reset instructions',
    success: 'Check your email for password reset instructions',
    error: 'Invalid email or email does not exist',
  })
}

const RequestPasswordReset = () => {
  const router = useRouter()
  const { user } = useAuth()
  const [email, setEmail] = useState('')
  useEffect(() => {
    //if the user is already logged in,they shouldn't be able to request password reset
    //since they can change password directly from their profile page
    if (user) router.push(`/${user.role.toLowerCase()}`)
  }, [router, user])
  return (
    <div className='mx-auto max-w-xl py-12'>
      <div className='mb-8 rounded-md bg-gray-800/75 p-4 shadow-sm'>
        <h1 className='heading-secondary mb-2'>Request Password Reset</h1>
        <p className='text-neutral-400'>
          Please enter your email address you used to register your account.We
          will send you a password reset link if your email address is found in
          our system.
        </p>
      </div>
      <form onSubmit={event => handlePasswordResetRequest(event, email)}>
        <TextInput
          label='Email Address'
          onChange={event => setEmail(event.currentTarget.value)}
          placeholder='johndoe123@gmail.com'
          size='md'
          value={email}
        />
        <Button
          className='mt-4 bg-indigo-600'
          fullWidth
          size='md'
          type='submit'
        >
          Request Password Reset
        </Button>
      </form>
    </div>
  )
}

export default RequestPasswordReset
