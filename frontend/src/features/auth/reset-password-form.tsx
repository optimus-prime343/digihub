import { Button, PasswordInput } from '@mantine/core'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { useResetPassword, useUser } from '@/hooks/auth'
import { resetPasswordSchema } from '@/schemas/reset-password-schema'

export const ResetPasswordForm = () => {
  const router = useRouter()
  const { mutateAsync } = useResetPassword()
  const { user } = useUser()
  const { errors, getFieldProps, handleSubmit, touched, isSubmitting } =
    useFormik({
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
        try {
          await mutateAsync({ token: passwordResetToken, payload: values })
          await router.push('/auth/login')
        } catch (error: any) {
          toast.error(error.message)
        }
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
          disabled={isSubmitting}
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
