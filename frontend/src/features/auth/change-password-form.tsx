import { Button, PasswordInput } from '@mantine/core'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { useChangePassword } from '@/hooks/auth'

export const ChangePasswordForm = () => {
  const router = useRouter()
  const { mutateAsync } = useChangePassword()
  const { getFieldProps, handleSubmit, isSubmitting } = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    onSubmit: async values => {
      try {
        await mutateAsync(values)
        await router.push('/auth/login')
        toast.success('Password changed successfully')
      } catch (error: any) {
        toast.error(error.message)
      }
    },
  })
  return (
    <div className='rounded-md bg-gray-600 p-4 shadow-md'>
      <h4 className='heading-tertiary mb-4'>Change Password</h4>
      <form className='space-y-4' onSubmit={handleSubmit}>
        <PasswordInput
          label='Current Password'
          {...getFieldProps('currentPassword')}
          placeholder='********'
        />
        <div className='grid gap-4 lg:grid-cols-2'>
          <PasswordInput
            label='New Password'
            {...getFieldProps('newPassword')}
            placeholder='********'
          />
          <PasswordInput
            label='Confirm New Password'
            {...getFieldProps('confirmNewPassword')}
            placeholder='********'
          />
        </div>
        <Button className='bg-indigo-600' loading={isSubmitting} type='submit'>
          Change Password
        </Button>
      </form>
    </div>
  )
}

export default ChangePasswordForm
