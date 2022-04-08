import {
  Alert,
  Button,
  Divider,
  Group,
  PasswordInput,
  Stepper,
  Textarea,
  TextInput,
} from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import {
  randCompanyName,
  randEmail,
  randFirstName,
  randLastName,
  randStreetAddress,
  randTextRange,
  randUserName,
} from '@ngneat/falso'
import { useFormik } from 'formik'
import { useState } from 'react'

import { NextLink } from '@/components/core'
import { useSignup } from '@/hooks/auth'
import { signupMerchantSchema } from '@/schemas/signup-merchant-schema'
import { MerchantSignupPayload } from '@/types/merchant'

const initialValues: MerchantSignupPayload = {
  firstName: randFirstName(),
  lastName: randLastName(),
  email: randEmail(),
  username: randUserName(),
  password: 'Sachin123@',
  passwordConfirm: 'Sachin123@',
  address: randStreetAddress(),
  businessDescription: randTextRange({ min: 30, max: 100 }),
  businessName: randCompanyName(),
  phoneNumber: '+9779857456746',
}

export const MerchantSignupForm = () => {
  const { showNotification } = useNotifications()

  // state for signup stepper
  const [active, setActive] = useState(0)
  const nextStep = () =>
    setActive(current => (current < 2 ? current + 1 : current))
  const prevStep = () =>
    setActive(current => (current > 0 ? current - 1 : current))

  const signupMutation = useSignup()

  const { getFieldProps, submitForm, touched, errors, isSubmitting } =
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
              showNotification({
                title: 'Signed up as Merchant',
                message: data,
              })
              setActive(3)
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
    <div className='mx-auto flex max-w-4xl grow flex-col p-4 lg:px-0'>
      <form className='space-y-4 rounded-md bg-gray-600 p-4 shadow-md'>
        <h2 className='heading-secondary'>Create an account as Merchant</h2>
        <Divider />
        <Stepper active={active} breakpoint='sm' onStepClick={setActive}>
          <Stepper.Step
            description='Provide your personal information'
            label='Personal Information'
          >
            <div className='grid grid-cols-2 gap-4'>
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
              <PasswordInput
                error={getFieldError('passwordConfirm')}
                label='Password Confirm'
                placeholder='********'
                {...getFieldProps('passwordConfirm')}
              />
            </div>
          </Stepper.Step>
          <Stepper.Step
            description='Provide information about your business'
            label='Business Information'
          >
            <div className='space-y-2'>
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
            </div>
          </Stepper.Step>
          <Stepper.Step description='Final Step' label='Review'>
            <div className='flex flex-col gap-2 rounded bg-gray-500 p-2 text-gray-50'>
              {Object.values(errors).length > 0 &&
                Object.values(errors).map((error, index) => (
                  <Alert color='red' key={index} variant='filled'>
                    {error}
                  </Alert>
                ))}
              <span>Please double check your information</span>
              <span>If everything seems fine you can proceed to signup</span>
            </div>
          </Stepper.Step>
          <Stepper.Completed>
            <h3 className='heading-tertiary mb-2'>Registration Successful</h3>
            <p className='max-w-md text-gray-100'>
              Please check your email for account verification link.Once your
              account is verified you can login and once approved by the admin,
              you will be able to sell products.
            </p>
            <Button component={NextLink} href='/auth/login' mt='sm'>
              Proceed to login
            </Button>
          </Stepper.Completed>
        </Stepper>
        <Group>
          <Button onClick={prevStep} variant='default'>
            Previous
          </Button>
          {active === 2 ? (
            <Button loading={isSubmitting} onClick={submitForm}>
              Confirm Signup
            </Button>
          ) : (
            <Button onClick={nextStep} type='button'>
              Next
            </Button>
          )}
        </Group>
      </form>
    </div>
  )
}
