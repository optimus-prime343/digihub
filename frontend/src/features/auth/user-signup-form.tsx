import { Button, PasswordInput, TextInput } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import {
  randEmail,
  randFirstName,
  randLastName,
  randUserName,
} from '@ngneat/falso'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'

import { useSignup } from '@/hooks/auth'
import { signupUserSchema } from '@/schemas/signup-user-schema'
import { SignupPayload } from '@/types/user'

const initialValues: SignupPayload = {
  firstName: randFirstName(),
  lastName: randLastName(),
  username: randUserName(),
  email: randEmail(),
  password: 'Sachin123@',
  passwordConfirm: 'Sachin123@',
}

export const UserSignupForm = () => {
  const router = useRouter()
  const signup = useSignup()
  const notifications = useNotifications()
  const { getFieldProps, touched, errors, handleSubmit } = useFormik({
    initialValues,
    validationSchema: signupUserSchema,
    onSubmit: async values => {
      try {
        const message = await signup.mutateAsync(values)
        await router.push('/auth/login')
        notifications.showNotification({
          color: 'green',
          title: 'Successfully signed up!',
          message,
        })
      } catch (error: any) {
        notifications.showNotification({
          color: 'red',
          title: 'Signup Failed',
          message: error.message,
        })
      }
    },
  })
  const getFieldError = (fieldName: keyof SignupPayload) => {
    return touched[fieldName] && errors[fieldName]
      ? errors[fieldName]
      : undefined
  }
  return (
    <div className='max-w-lg p-4 lg:p-0'>
      <form
        className='space-y-4 rounded-md bg-gray-600 p-4 shadow-md'
        onSubmit={handleSubmit}
      >
        <h2 className='heading-secondary'>Create an account</h2>
        <span className='divider' />
        <TextInput
          error={getFieldError('firstName')}
          label='First Name'
          {...getFieldProps('firstName')}
          placeholder='John'
        />
        <TextInput
          error={getFieldError('lastName')}
          label='Last Name'
          {...getFieldProps('lastName')}
          placeholder='Doe'
        />
        <TextInput
          error={getFieldError('username')}
          label='Username'
          placeholder='JohnDoe'
          {...getFieldProps('username')}
        />
        <TextInput
          error={getFieldError('email')}
          label='Email Address'
          {...getFieldProps('email')}
          placeholder='johndoe@gmail.com'
        />
        <PasswordInput
          error={getFieldError('password')}
          label='Password'
          {...getFieldProps('password')}
          placeholder='********'
        />
        <PasswordInput
          error={getFieldError('passwordConfirm')}
          label='Password Confirm'
          {...getFieldProps('passwordConfirm')}
          placeholder='********'
        />
        <Button
          className='bg-indigo-600'
          fullWidth
          loading={signup.isLoading}
          type='submit'
        >
          Signup
        </Button>
      </form>
    </div>
  )
}
