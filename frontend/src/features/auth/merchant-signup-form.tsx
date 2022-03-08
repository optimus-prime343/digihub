import {
  Button,
  Group,
  PasswordInput,
  Textarea,
  TextInput,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useNotifications } from '@mantine/notifications'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'

import { useSignup } from '@/hooks/auth'
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

export const MerchantSignupForm = () => {
  const { showNotification } = useNotifications()
  const isPhone = useMediaQuery('(max-width: 600px)')
  const signupMutation = useSignup()
  const router = useRouter()
  const { getFieldProps, handleSubmit, touched, errors, isSubmitting } =
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
        try {
          await signupMutation.mutateAsync(data, {
            onSuccess: async data => {
              await router.push('/auth/login')
              showNotification({
                title: 'Signed up as Merchant',
                message: data,
              })
            },
          })
        } catch (error: any) {
          showNotification({
            title: 'Signup Failed',
            message: error.message,
            color: 'red',
          })
        }
      },
    })
  const getFieldError = (fieldName: keyof MerchantSignupPayload) => {
    return errors[fieldName] && touched[fieldName]
      ? errors[fieldName]
      : undefined
  }
  return (
    <div className='mx-auto flex grow flex-col p-4 lg:px-0'>
      <form
        className='space-y-4 rounded-md bg-gray-600 p-4 shadow-md'
        onSubmit={handleSubmit}
      >
        <h2 className='heading-secondary'>Create an account as Merchant</h2>
        <span className='divider'></span>
        <Group align='start' direction={isPhone ? 'column' : 'row'} grow>
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
        </Group>
        <Group align='start' direction={isPhone ? 'column' : 'row'} grow>
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
        </Group>
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
          disabled={isSubmitting}
          fullWidth
          type='submit'
        >
          Sign Up
        </Button>
      </form>
    </div>
  )
}
