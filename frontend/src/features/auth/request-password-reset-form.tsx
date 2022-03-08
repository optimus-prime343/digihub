import { Button, TextInput } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { useUser } from '@/hooks/auth'
import { authService } from '@/services/auth-service'

export const RequestPasswordResetForm = () => {
  const router = useRouter()
  const { user } = useUser()
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  useEffect(() => {
    //if the user is already logged in,they shouldn't be able to request password reset
    //since they can change password directly from their profile page
    if (user) router.push('/')
  }, [router, user])
  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <div className='my-4 mx-auto max-w-md rounded-md bg-gray-600 p-4 lg:my-12'>
        <h3 className='heading-secondary'>Reset your password</h3>
        {success ? (
          <ResetSuccess email={email} />
        ) : (
          <RequestReset
            email={email}
            onResetSuccess={() => setSuccess(true)}
            setEmail={setEmail}
          />
        )}
      </div>
    </div>
  )
}

const RequestReset = ({
  onResetSuccess,
  email,
  setEmail,
}: {
  email: string
  setEmail: (email: string) => void
  onResetSuccess: () => void
}) => {
  const { showNotification } = useNotifications()
  // const [email, setEmail] = useState('')
  const { isLoading, mutateAsync } = useMutation<string, Error, string>(email =>
    authService.requestPasswordReset(email)
  )
  const handlePasswordResetRequest = async (
    event: FormEvent<HTMLFormElement>,
    email: string
  ) => {
    event.preventDefault()
    if (!email) return toast.error('Email address can"t be empty')
    try {
      await mutateAsync(email)
      onResetSuccess()
    } catch (error: any) {
      showNotification({
        message: error.message,
        color: 'red',
      })
    }
  }
  return (
    <>
      <p className='mt-2 mb-4'>
        Enter your email address and we&apos; send you a link to reset your
        password
      </p>
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
          loading={isLoading}
          size='md'
          type='submit'
        >
          Request Password Reset
        </Button>
      </form>
    </>
  )
}
const ResetSuccess = ({ email }: { email: string }) => {
  const router = useRouter()
  return (
    <>
      <p className='mt-4'>
        An email is on its way to{' '}
        <span className='font-bold text-white'>{email}</span> with instructions
        for resetting your password
      </p>
      <p className='mt-2 mb-4'>
        If you do not see the email on your inbox, check your spam folder
      </p>
      <Button onClick={() => router.push('/auth/login')} variant='outline'>
        Return to sign in
      </Button>
    </>
  )
}
