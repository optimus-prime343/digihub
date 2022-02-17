import { Alert, Button, Textarea, TextInput } from '@mantine/core'
import { useFormik } from 'formik'
import { FC } from 'react'
import toast from 'react-hot-toast'

import { useMerchant } from '~context/merchant'
import { IUser } from '~types/user'

interface UpdateMerchantProfileFormProperties {
  user: IUser
}

const MerchantProfileForm: FC<UpdateMerchantProfileFormProperties> = ({
  user,
}) => {
  const { updateMerchant, error } = useMerchant()
  const { getFieldProps, handleSubmit } = useFormik({
    initialValues: {
      businessName: user.merchant?.businessName ?? '',
      address: user.merchant?.address ?? '',
      businessDescription: user.merchant?.businessDescription ?? '',
    },
    onSubmit: values => {
      updateMerchant(values, () => {
        toast.success('Business profile updated successfully')
      })
    },
  })
  return (
    <div>
      <form
        className='rounded-md bg-gray-800 p-4 shadow-md'
        onSubmit={handleSubmit}
      >
        <h4 className='heading-tertiary mb-4'>Business Information</h4>
        {error && (
          <Alert color='red' title='Update Failed' variant='filled'>
            {error}
          </Alert>
        )}
        <div className='mt-2 grid grid-cols-1 gap-4 lg:grid-cols-2'>
          <TextInput label='Business Name' {...getFieldProps('businessName')} />
          <TextInput label='Address' {...getFieldProps('address')} />
          <Textarea
            className='col-span-1 lg:col-span-2'
            label='Business Description'
            minRows={5}
            {...getFieldProps('businessDescription')}
          />
        </div>
        <div className='mt-4 flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-4'>
          <Button className='bg-indigo-600' type='submit'>
            Update Business Information
          </Button>
        </div>
      </form>
    </div>
  )
}

export default MerchantProfileForm
