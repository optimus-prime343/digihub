import { Button, PasswordInput } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import { useFormik } from 'formik'

import { useChangePassword } from '@/hooks/auth'

export const ChangePasswordForm = () => {
  const { showNotification } = useNotifications()
  const { mutateAsync } = useChangePassword()
  const { getFieldProps, handleSubmit, isSubmitting, resetForm } = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    onSubmit: async values => {
      try {
        await mutateAsync(values)
        showNotification({ message: 'Password changed successfully' })
        resetForm()
      } catch (error: any) {
        showNotification({ message: error.message })
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
        <Button loading={isSubmitting} type='submit'>
          Change Password
        </Button>
      </form>
    </div>
  )
}

export default ChangePasswordForm
