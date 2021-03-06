import { Button, TextInput } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'

import { useLogout, useUser } from '@/hooks/auth'
import { useUpdateUser } from '@/hooks/user'
import { IUser } from '@/types/user'

import { ChangeProfileImageForm } from './change-profile-image-form'

export const PersonalInformationForm = () => {
  const { showNotification } = useNotifications()
  const router = useRouter()
  const { user } = useUser()
  const logout = useLogout()
  const { mutateAsync } = useUpdateUser()
  const { getFieldProps, handleSubmit } = useFormik({
    initialValues: {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      email: user?.email ?? '',
      username: user?.username ?? '',
    },
    onSubmit: async values => {
      try {
        await mutateAsync(values, {
          onSuccess: () => {
            showNotification({
              message: 'Profile updated successfully',
            })
          },
        })
      } catch (error: any) {
        showNotification({
          title: 'Update user failed',
          message: error.message,
        })
      }
    },
  })
  const handleLogout = async () => {
    await logout()
    await router.push(`/auth/login`)
    showNotification({
      message: 'Logged out successfully',
    })
  }
  return (
    <div className='rounded-md bg-gray-600 p-4 shadow-sm'>
      <h4 className='heading-tertiary mb-4'>Personal Information</h4>
      <ChangeProfileImageForm user={user as IUser} />
      <form className='mt-4 space-y-4' onSubmit={handleSubmit}>
        <div className='grid gap-4 lg:grid-cols-2'>
          <TextInput label='First Name' {...getFieldProps('firstName')} />
          <TextInput label='Last Name' {...getFieldProps('lastName')} />
          <TextInput label='Username' {...getFieldProps('username')} />
          <TextInput label='Email Address' {...getFieldProps('email')} />
        </div>
        <div className='flex flex-col gap-2 lg:flex-row'>
          <Button className='bg-indigo-600' type='submit'>
            Update Personal Information
          </Button>
          <Button color='red' onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </form>
    </div>
  )
}
