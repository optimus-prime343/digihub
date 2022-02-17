import { Button, PasswordInput, TextInput } from '@mantine/core'
import {
  randEmail,
  randFirstName,
  randLastName,
  randPassword,
  randUserName,
} from '@ngneat/falso'
import { useFormik } from 'formik'
import React from 'react'

import { signupUserSchema } from '~schemas/signup-user-schema'
import { SignupPayload } from '~types/user'

const initialValues: SignupPayload = {
  firstName: randFirstName(),
  lastName: randLastName(),
  username: randUserName(),
  email: randEmail(),
  password: randPassword(),
}

const SignupUserForm = () => {
  const { getFieldProps, touched, errors, handleSubmit } = useFormik({
    initialValues,
    validationSchema: signupUserSchema,
    onSubmit: values => {
      console.log(values)
    },
  })
  const getFieldError = (fieldName: keyof SignupPayload) => {
    return touched[fieldName] && errors[fieldName]
      ? errors[fieldName]
      : undefined
  }
  return (
    <div className='p-4 lg:p-0'>
      <div className='mb-6 rounded-md bg-gray-800/75 p-4 shadow-md'>
        <h3 className='heading-secondary mb-2'>Signup for Digihub</h3>
        <p className='leading-loose text-neutral-400'>
          Please fill out the form below with all the details to register as a
          user.Once registration is complete you can start buying products from
          our marketplace.
        </p>
      </div>
      <form className='space-y-4' onSubmit={handleSubmit}>
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
        <Button className='bg-indigo-600' fullWidth type='submit'>
          Signup
        </Button>
      </form>
    </div>
  )
}

export default SignupUserForm
