import { Button, PasswordInput, TextInput } from '@mantine/core'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { FaUserCircle } from 'react-icons/fa'
import { MdPassword } from 'react-icons/md'
import { toast } from 'react-toastify'

import { NextLink } from '@/components/core'
import { useLogin } from '@/hooks/auth'
import { loginSchema } from '@/schemas/login-schema'
import { LoginPayload } from '@/types/user'

const initialValues: LoginPayload = {
  username: 'Santos98',
  password: 'Sachin123@',
}

const LoginForm = () => {
  const login = useLogin()
  const router = useRouter()
  const { getFieldProps, errors, touched, handleSubmit, isSubmitting } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async data => {
        try {
          await login(data)
          //check whether there is next query param attached to the login route
          //if there is, redirect user to that page after successfull login else redirect to homepage
          router.push((router.query.next as string) ?? '/')
        } catch (error: any) {
          toast.error(error.message)
        }
      },
    })
  const getFieldError = (fieldName: keyof typeof initialValues) => {
    return errors[fieldName] && touched[fieldName]
      ? errors[fieldName]
      : undefined
  }
  return (
    <div className='mx-auto my-4 max-w-lg space-y-4 p-4 lg:my-12 lg:p-0'>
      <div className='mb-8 rounded-md bg-gray-800 p-4 shadow-sm'>
        <h3 className='text-4xl font-bold'>Login to your account</h3>
        <p className='mt-2 leading-loose text-neutral-400'>
          Once logged in you can browse and purchase product as a user or add
          and sell products if you are registered as a seller.
        </p>
      </div>
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
        <NextLink className='underline' href='/auth/request-password-reset'>
          Forgot your password ?
        </NextLink>
        <NextLink className='underline' href='/auth/signup?as=user'>
          Create an account ?
        </NextLink>
        <NextLink className='underline' href='/auth/signup?as=merchant'>
          Create an account as a seller ?
        </NextLink>
      </div>
    </div>
  )
}

export default LoginForm
