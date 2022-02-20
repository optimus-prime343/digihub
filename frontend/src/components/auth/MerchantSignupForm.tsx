import {
  Alert,
  Button,
  PasswordInput,
  Textarea,
  TextInput,
} from '@mantine/core'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

import { useAuth } from '@/context/auth'
import { signupMerchantSchema } from '@/schemas/signup-merchant-schema'
import { MerchantSignupPayload } from '@/types/merchant'

const initialValues: MerchantSignupPayload = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  address: '',
  businessDescription: '',
  businessName: '',
  phoneNumber: '',
}

const MerchantSignupForm = () => {
  const { loading, error, signup } = useAuth()
  const router = useRouter()
  const { getFieldProps, handleSubmit, touched, errors } =
    useFormik<MerchantSignupPayload>({
      initialValues,
      validationSchema: signupMerchantSchema,
      onSubmit: async values => {
        const data = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          username: values.username,
          password: values.password,
          passwordConfirm: values.password,
          merchant: {
            businessName: values.businessName,
            businessDescription: values.businessDescription,
            address: values.address,
            phoneNumber: values.phoneNumber,
          },
        }
        signup(data, () => {
          router.push('/auth/login').then(() => {
            toast.success('Please check your email to verify your account')
          })
        })
      },
    })
  const getFieldError = (fieldName: keyof MerchantSignupPayload) => {
    return errors[fieldName] && touched[fieldName]
      ? errors[fieldName]
      : undefined
  }
  return (
    <div className='mx-auto flex grow flex-col p-4 lg:px-0'>
      <div className='mb-6 rounded-md bg-gray-800/75 p-4 shadow-md'>
        <h3 className='heading-secondary mb-2'>Get started as a seller </h3>
        <p className='leading-loose text-neutral-400'>
          Please fill out the form below with all the details to register as a
          seller.Once approved by our team you can start selling your products.
        </p>
      </div>
      <form className='mt-4 space-y-4' onSubmit={handleSubmit}>
        {error && (
          <Alert color='red' title='Signup Failed' variant='filled'>
            {error}
          </Alert>
        )}
        <TextInput
          error={getFieldError('firstName')}
          label='First Name'
          placeholder='John'
          {...getFieldProps('firstName')}
        />
        <TextInput
          error={getFieldError('lastName')}
          label='Last Name'
          placeholder='Doe'
          {...getFieldProps('lastName')}
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
          placeholder='johndoe@gmail.com'
          {...getFieldProps('email')}
        />
        <PasswordInput
          error={getFieldError('password')}
          label='Password'
          placeholder='********'
          {...getFieldProps('password')}
        />
        <TextInput
          error={getFieldError('businessName')}
          label='Business Name'
          placeholder='Johndoe Gift Cards'
          {...getFieldProps('businessName')}
        />
        <Textarea
          error={getFieldError('businessDescription')}
          label='Business Description'
          minRows={8}
          placeholder='Short description about your business'
          {...getFieldProps('businessDescription')}
        />
        <TextInput
          error={getFieldError('address')}
          label='Address'
          placeholder='Kathmandu, Nepal'
          {...getFieldProps('address')}
        />
        <TextInput
          error={getFieldError('phoneNumber')}
          label='Phone Number'
          placeholder='9846******'
          {...getFieldProps('phoneNumber')}
        />
        <Button
          className='mt-4 bg-indigo-600'
          disabled={loading}
          fullWidth
          type='submit'
        >
          Sign Up
        </Button>
      </form>
    </div>
  )
}

export default MerchantSignupForm
