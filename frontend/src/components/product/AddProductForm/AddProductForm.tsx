import { Alert, Button, Textarea, TextInput } from '@mantine/core'
import {
  randNumber,
  randProductDescription,
  randProductName,
} from '@ngneat/falso'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useState } from 'react'
import toast from 'react-hot-toast'

import { PreviewImages } from '@/components/core'
import MerchantSidebar from '@/components/ui/MerchantSidebar'
import { useProduct } from '@/context/product'
import { addProductSchema } from '@/schemas/add-product-schema'

const AddProductForm = () => {
  const { addProduct, loading, error } = useProduct()
  const router = useRouter()
  const [fileList, setFileList] = useState<FileList | undefined>()
  const [images, setImages] = useState<string[]>([])

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setFileList(files)
      const imageUrls = Array.from(files).map(file => URL.createObjectURL(file))
      setImages(imageUrls)
    }
  }
  const { getFieldProps, errors, touched, handleSubmit, values } = useFormik({
    initialValues: {
      name: randProductName(),
      description: randProductDescription(),
      price: randNumber({ min: 500, max: 3000 }),
      quantity: randNumber({ min: 1, max: 50 }),
    },
    validationSchema: addProductSchema,
    onSubmit: async values => {
      if (!fileList) {
        toast.error('At least one image is required')
      } else {
        const formData = new FormData()

        for (const [key, value] of Object.entries(values)) {
          formData.append(key, value.toString())
        }

        for (const file of Array.from(fileList ?? []))
          formData.append('productImage', file)

        await addProduct(formData, () => {
          router.push('/merchant/products').then(() => {
            toast.success('Product added successfully')
          })
        })
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
      <div className='max-w-4xl rounded-md bg-gray-800 p-4 shadow-sm'>
        <h4 className='heading-tertiary mb-4'>Add a New Product</h4>
        <form className='space-y-4' onSubmit={handleSubmit}>
          {error && (
            <Alert
              color='red'
              title='Failed to add new product'
              variant='filled'
            >
              {error}
            </Alert>
          )}
          <TextInput
            error={getFieldError('name')}
            label='Name'
            placeholder='Netflix Gift Card'
            {...getFieldProps('name')}
          />
          <Textarea
            error={getFieldError('description')}
            label='Description'
            placeholder='Short description about your product'
            {...getFieldProps('description')}
            minRows={5}
          />
          <div className='grid grid-cols-2 gap-4'>
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
          </div>
          <div>
            <label className='mb-2 block' htmlFor='product-images'>
              Images
            </label>
            <input
              accept='image/*'
              className='input--file w-full p-2'
              multiple
              onChange={handleFileUpload}
              type='file'
            />
            {images.length > 0 && <PreviewImages images={images} />}
          </div>
          <Button className='bg-indigo-600' disabled={loading} type='submit'>
            Add Product
          </Button>
        </form>
      </div>
    </MerchantSidebar>
  )
}

export default AddProductForm
