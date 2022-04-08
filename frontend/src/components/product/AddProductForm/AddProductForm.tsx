import { Button, Textarea, TextInput } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import {
  randNumber,
  randProductDescription,
  randProductName,
} from '@ngneat/falso'
import { useFormik } from 'formik'
import Image from 'next/image'
import React, { ChangeEvent, useState } from 'react'
import { BsImage } from 'react-icons/bs'

import { MerchantSidebar } from '@/components/ui'
import { useAddProduct } from '@/hooks/product'
import { addProductSchema } from '@/schemas/add-product-schema'

const AddProductForm = () => {
  const { showNotification } = useNotifications()
  const { mutateAsync, isLoading } = useAddProduct()
  const [file, setFile] = useState<File | undefined>()
  const [image, setImage] = useState<string | undefined>()

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : undefined
    if (file) {
      setFile(file)
      const imageUrl = URL.createObjectURL(file)
      setImage(imageUrl)
    }
  }
  const { getFieldProps, errors, touched, handleSubmit, values, resetForm } =
    useFormik({
      initialValues: {
        name: randProductName(),
        description: randProductDescription(),
        price: randNumber({ min: 500, max: 3000 }),
        quantity: randNumber({ min: 1, max: 50 }),
        tags: '',
      },
      validationSchema: addProductSchema,
      onSubmit: async values => {
        if (!file) {
          showNotification({ message: 'Product image cover is required' })
        } else {
          const formData = new FormData()
          for (const [key, value] of Object.entries(values)) {
            formData.append(key, value.toString())
          }
          formData.append('coverImage', file)
          try {
            await mutateAsync(formData)
            resetForm()
            showNotification({ message: 'Product added successfully' })
          } catch (error: any) {
            showNotification({
              title: 'Failed to add product',
              message: error.message,
              color: 'red',
            })
          }
        }
      },
    })
  const getFieldError = (fieldName: keyof typeof values) => {
    return errors[fieldName] && touched[fieldName]
      ? errors[fieldName]
      : undefined
  }
  return (
    <MerchantSidebar>
      <div className='max-w-4xl rounded-md bg-gray-600 p-4 shadow-sm'>
        <h4 className='heading-tertiary mb-4'>Add a New Product</h4>
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-2 gap-4'>
            <TextInput
              error={getFieldError('name')}
              label='Name'
              placeholder='Netflix Gift Card'
              {...getFieldProps('name')}
            />
            <TextInput
              error={getFieldError('price')}
              label='Price(In Rs)'
              placeholder='300'
              type='number'
              {...getFieldProps('price')}
            />
            <TextInput
              error={getFieldError('quantity')}
              label='Quantity'
              placeholder='10'
              type='number'
              {...getFieldProps('quantity')}
            />
            <TextInput
              error={getFieldError('tags')}
              label='Tags'
              placeholder='Product tags'
              type='text'
              {...getFieldProps('tags')}
            />
          </div>
          <Textarea
            error={getFieldError('description')}
            label='Description'
            placeholder='Short description about your product'
            {...getFieldProps('description')}
            minRows={5}
          />
          <div className='my-2'>
            <Button
              component='label'
              htmlFor='cover-image'
              leftIcon={<BsImage />}
              variant='outline'
            >
              Upload Images
            </Button>
            <input
              accept='image/*'
              className='hidden'
              id='cover-image'
              multiple
              onChange={handleFileUpload}
              type='file'
            />
          </div>
          {/* Preview of the uploaded image */}
          <div>
            {image && (
              <Image
                alt='Cover'
                className='rounded'
                height={200}
                objectFit='cover'
                src={image}
                width={400}
              />
            )}
          </div>
          <Button disabled={isLoading} type='submit'>
            Add Product
          </Button>
        </form>
      </div>
    </MerchantSidebar>
  )
}

export default AddProductForm
