import {
  Anchor,
  Button,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaUserCircle } from 'react-icons/fa'
import { MdPassword } from 'react-icons/md'

import { NextLink } from '@/components/core'
import { useLogin } from '@/hooks/auth'
import { loginSchema } from '@/schemas/login-schema'
import { LoginPayload } from '@/types/user'

const initialValues: LoginPayload = {
  username: '',
  password: '',
}

export const LoginForm = () => {
  const login = useLogin()
  const router = useRouter()
  const { showNotification } = useNotifications()
  const { getFieldProps, errors, touched, handleSubmit, isSubmitting } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async data => {
        try {
          await login(data)
          //check whether there is next query param attached to the login route
          //if there is, redirect user to that page after successfull login else redirect to homepage
          showNotification({ message: 'Successfully logged in' })
          router.push((router.query.next as string) ?? '/')
        } catch (error: any) {
          showNotification({
            title: 'Login Failed',
            message: error.message,
            color: 'red',
          })
        }
      },
    })
  const getFieldError = (fieldName: keyof typeof initialValues) => {
    return errors[fieldName] && touched[fieldName]
      ? errors[fieldName]
      : undefined
  }
  return (
    <div className='mx-auto w-full flex-1 rounded-md'>
      <Title mb='xs'>WELCOME BACK</Title>
      <Text color='dimmed' mb='lg' size='sm'>
        Welcome back! Please enter your details
      </Text>
      <form className='space-y-4' onSubmit={handleSubmit}>
        <TextInput
          error={getFieldError('username')}
          icon={<FaUserCircle />}
          label='Username'
          placeholder='JohnDoe'
          {...getFieldProps('username')}
        />
        <PasswordInput
          error={getFieldError('password')}
          label='Password'
          placeholder='********'
          {...getFieldProps('password')}
          icon={<MdPassword />}
        />
        <Anchor
          className='mr-auto block'
          component={NextLink}
          href='/auth/request-password-reset'
        >
          Forgot password ?
        </Anchor>
        <Button
          aria-label='Login'
          className='bg-indigo-600'
          disabled={isSubmitting}
          fullWidth
          type='submit'
        >
          Login
        </Button>
      </form>
      <div className='mt-4 flex flex-col items-center gap-2'>
        {helperLinks.map(({ href, name }) => (
          <Anchor component={NextLink} href={href} key={href}>
            {name}
          </Anchor>
        ))}
      </div>
    </div>
  )
}
const helperLinks = [
  {
    name: 'Create an account',
    href: '/auth/signup?as=user',
  },
  {
    name: 'Create an account as a seller',
    href: '/auth/signup?as=merchant',
  },
]
