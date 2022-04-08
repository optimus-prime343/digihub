import { Button, PasswordInput, TextInput } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import { useFormik } from 'formik'
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
    <div className='mx-auto my-4 max-w-md space-y-4 rounded-md bg-gray-600 p-6 lg:my-12'>
      <h3 className='heading-secondary text-center'>Login to Your Account</h3>
      <span className='my-4 block h-px w-full bg-gray-400' />
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
      <div className='flex flex-col items-center gap-2'>
        {helperLinks.map(({ href, name }) => (
          <NextLink className='hover:text-indigo-400' href={href} key={href}>
            {name}
          </NextLink>
        ))}
      </div>
    </div>
  )
}
const helperLinks = [
  {
    name: 'Forgot your password ?',
    href: '/auth/request-password-reset',
  },
  {
    name: 'Create an account',
    href: '/auth/signup?as=user',
  },
  {
    name: 'Create an account as a seller',
    href: '/auth/signup?as=merchant',
  },
]
