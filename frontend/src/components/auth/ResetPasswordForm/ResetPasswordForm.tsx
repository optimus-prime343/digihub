import { Alert, Button, PasswordInput } from '@mantine/core'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { useAuth } from '@/context/auth'
import { resetPasswordSchema } from '@/schemas/reset-password-schema'

const ResetPasswordPage = () => {
  const router = useRouter()
  const { resetPassword, error, user, loading } = useAuth()
  const { errors, getFieldProps, handleSubmit, touched } = useFormik({
    initialValues: {
      password: '',
      passwordConfirm: '',
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async values => {
      const { passwordResetToken } = router.query as {
        passwordResetToken: string
      }
      if (!passwordResetToken)
        return toast.error('Invalid password reset token')
      resetPassword(passwordResetToken, values, () => {
        router.push('/auth/login')
      })
    },
  })
  const getFieldError = (fieldName: 'password' | 'passwordConfirm') => {
    return errors[fieldName] && touched[fieldName]
      ? errors[fieldName]
      : undefined
  }
  useEffect(() => {
    if (user) router.push('/')
  }, [router, user])
  return (
    <div className='mx-auto max-w-xl py-6'>
      <h3 className='heading-secondary mb-6'>Reset your password</h3>
      <form className='space-y-4' onSubmit={handleSubmit}>
        {error && (
          <Alert color='red' title='Failed to Reset Password' variant='filled'>
            {error}
          </Alert>
        )}
        <PasswordInput
          error={getFieldError('password')}
          label='New Password'
          {...getFieldProps('password')}
          placeholder='xxxxxxxxxx'
          size='md'
        />
        <PasswordInput
          error={getFieldError('passwordConfirm')}
          label='Confirm New Password'
          {...getFieldProps('passwordConfirm')}
          placeholder='xxxxxxxxxx'
          size='md'
        />
        <Button
          className='bg-indigo-600'
          disabled={loading}
          fullWidth
          size='md'
          type='submit'
        >
          Reset Password
        </Button>
      </form>
    </div>
  )
}

export default ResetPasswordPage
