import { Alert, Button, Modal, Textarea, TextInput } from '@mantine/core'
import { useFormik } from 'formik'
import React, { Dispatch, FC, SetStateAction } from 'react'
import toast from 'react-hot-toast'

import { useProduct } from '~context/product'

interface IUpdateProductPromptProperties {
  id: string
  name: string
  opened: boolean
  setOpened: Dispatch<SetStateAction<boolean>>
  price: number
  description: string
}

const UpdateProductPrompt: FC<IUpdateProductPromptProperties> = ({
  id,
  name,
  description,
  price,
  opened,
  setOpened,
}) => {
  const { updateProduct, loading, error } = useProduct()
  const { getFieldProps, handleSubmit } = useFormik({
    initialValues: {
      name,
      description,
      price,
    },
    onSubmit: values => {
      console.log(values)
      updateProduct({ id, ...values }, () => {
        setOpened(false)
        toast.success('Product updated successfully')
      })
    },
  })
  return (
    <Modal
      onClose={() => setOpened(false)}
      opened={opened}
      title={`Update ${name}`}
    >
      <form className='space-y-4' onSubmit={handleSubmit}>
        {error && (
          <Alert color='red' title='Failed to update product' variant='filled'>
            {error}
          </Alert>
        )}
        <TextInput label='Name' {...getFieldProps('name')} />
        <Textarea
          label='Description'
          minRows={8}
          {...getFieldProps('description')}
        />
        <TextInput label='Price' type='number' {...getFieldProps('price')} />
        <Button
          className='bg-indigo-600'
          fullWidth
          loading={loading}
          type='submit'
        >
          Confirm Update
        </Button>
      </form>
    </Modal>
  )
}

export default UpdateProductPrompt
