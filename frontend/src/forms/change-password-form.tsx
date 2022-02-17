import { Alert, Button, PasswordInput } from '@mantine/core'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'

import { useAuth } from '~context/auth'

const ChangePasswordForm = () => {
  const { loading, changePassword, error } = useAuth()
  const { getFieldProps, handleSubmit } = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    onSubmit: async values => {
      await changePassword(values, () => {
        toast.success('Password changed successfully')
      })
    },
  })
  return (
    <div className='rounded-md bg-gray-800 p-4 shadow-md'>
      <h4 className='heading-tertiary mb-4'>Change Password</h4>
      <form className='space-y-4' onSubmit={handleSubmit}>
        {error && (
          <Alert color='red' title='Fail to change password' variant='filled'>
            {error}
          </Alert>
        )}
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
        <Button className='bg-indigo-600' disabled={loading} type='submit'>
          Change Password
        </Button>
      </form>
    </div>
  )
}

export default ChangePasswordForm
