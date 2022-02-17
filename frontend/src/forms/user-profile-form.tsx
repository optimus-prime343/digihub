import { Alert, Button, TextInput } from '@mantine/core'
import { useFormik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'

import { useAuth } from '~context/auth'
import { useUser } from '~context/user'
// import {} from '~'
import ProfileImageForm from '~forms/profile-image-form'
import { IUser } from '~types/user'

const UpdateUserProfileForm = () => {
  const { user, logout } = useAuth()
  const { updateUser, error } = useUser()
  const { getFieldProps, handleSubmit } = useFormik({
    initialValues: {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      email: user?.email ?? '',
      username: user?.username ?? '',
    },
    onSubmit: async values => {
      console.log(`Form Submitted`)
      await updateUser(values, () => {
        toast.success('Personal information updated successfully')
      })
    },
  })
  const handleLogout = () => {
    logout(() => {
      toast.success('Logged out successfully')
    })
  }
  return (
    <div className='rounded-md bg-gray-800 p-4 shadow-sm'>
      <h4 className='heading-tertiary mb-4'>Personal Information</h4>
      <ProfileImageForm user={user as IUser} />
      <form className='mt-4 space-y-4' onSubmit={handleSubmit}>
        {error && (
          <Alert color='red' variant='filled'>
            {error}
          </Alert>
        )}
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
          <Button
            className='bg-red-600 hover:bg-red-500'
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UpdateUserProfileForm
