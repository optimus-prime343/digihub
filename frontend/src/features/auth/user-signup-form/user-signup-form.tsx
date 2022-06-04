import {
  Anchor,
  Button,
  Checkbox,
  PasswordInput,
  TextInput,
} from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import {
  randEmail,
  randFirstName,
  randLastName,
  randUserName,
} from '@ngneat/falso'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { NextLink } from '@/components/core'
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
  // manage whether user has agreed to terms and conditions or not
  const [agreed, setAgreed] = useState(false)

  const router = useRouter()
  const signup = useSignup()
  const notifications = useNotifications()
  const { getFieldProps, touched, errors, handleSubmit } = useFormik({
    initialValues,
    validationSchema: signupUserSchema,
    onSubmit: async values => {
      try {
        const message = await signup.mutateAsync(values)
        notifications.showNotification({
          color: 'green',
          title: 'Successfully signed up!',
          message,
        })
        router.push('/auth/login')
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
    <div className='mx-auto max-w-lg p-4 lg:p-0'>
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
        <Checkbox
          defaultChecked={agreed}
          label={
            <Anchor component={NextLink} href='/terms-and-conditions'>
              I agree to Digihub Terms and Conditions
            </Anchor>
          }
          onChange={event => setAgreed(event.currentTarget.checked)}
        />
        <Button
          className='bg-indigo-600'
          disabled={!agreed}
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
