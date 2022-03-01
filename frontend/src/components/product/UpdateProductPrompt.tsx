import { Button, Modal, Textarea, TextInput } from '@mantine/core'
import { useFormik } from 'formik'
import React, { Dispatch, FC, SetStateAction } from 'react'
import { toast } from 'react-toastify'

import { useUpdateProduct } from '@/hooks/product'

interface IUpdateProductPromptProperties {
  id: string
  name: string
  opened: boolean
  setOpened: Dispatch<SetStateAction<boolean>>
  price: number
  description: string
  quantity: number
}

const UpdateProductPrompt: FC<IUpdateProductPromptProperties> = ({
  id,
  name,
  description,
  price,
  opened,
  setOpened,
  quantity,
}) => {
  const { mutateAsync, isLoading } = useUpdateProduct()
  const { getFieldProps, handleSubmit } = useFormik({
    initialValues: {
      name,
      description,
      price,
      quantity,
    },
    onSubmit: async values => {
      try {
        await mutateAsync({ id, ...values })
        setOpened(false)
      } catch (error: any) {
        toast.error(error.message)
      }
    },
  })
  return (
    <Modal
      onClose={() => setOpened(false)}
      opened={opened}
      title={`Update ${name}`}
    >
      <form className='space-y-4' onSubmit={handleSubmit}>
        <TextInput label='Name' {...getFieldProps('name')} />
        <Textarea
          label='Description'
          minRows={8}
          {...getFieldProps('description')}
        />
        <TextInput label='Price' type='number' {...getFieldProps('price')} />
        <TextInput
          label='quantity'
          type='number'
          {...getFieldProps('quantity')}
        />
        <Button
          className='bg-indigo-600'
          fullWidth
          loading={isLoading}
          type='submit'
        >
          Confirm Update
        </Button>
      </form>
    </Modal>
  )
}

export default UpdateProductPrompt
