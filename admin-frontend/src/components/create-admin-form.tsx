import { Button, PasswordInput, TextInput } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import { randEmail, randFirstName, randLastName, randUserName } from '@ngneat/falso'
import { useRouter } from 'next/router'
import { FormEvent } from 'react'

import { useCreateAdmin } from '../hooks/use-create-admin'

const formDataToObject = (
  formData: FormData
): Record<string, FormDataEntryValue> => {
  return Object.fromEntries(formData)
}
export const CreateAdminForm = () => {
  const router = useRouter()
  const { showNotification } = useNotifications()
  const createAdmin = useCreateAdmin()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const formDataObject = formDataToObject(formData)

    try {
      const message = await createAdmin.mutateAsync(formDataObject)
      await router.push('/')
      showNotification({ message })
    } catch (error: any) {
      showNotification({
        title: 'Failed to create admin',
        message: error.message,
        color: 'red',
      })
    }
  }
  return (
    <form onSubmit={handleSubmit} className='space-y-2'>
      <TextInput
        name='firstName'
        label='First name'
        defaultValue={randFirstName()}
      />
      <TextInput name='lastName' label='Last Name' defaultValue={randLastName()} />
      <TextInput name='email' label='Email' defaultValue={randEmail()} />
      <TextInput name='username' label='Username' defaultValue={randUserName()} />
      <PasswordInput name='password' label='Password' defaultValue={'Sachin123@'} />
      <PasswordInput
        name='passwordConfirm'
        label='Password Confirm'
        defaultValue='Sachin123@'
      />
      <PasswordInput name='adminPassword' label='Superuser password' />
      <Button type='submit' fullWidth>
        Confirm
      </Button>
    </form>
  )
}
