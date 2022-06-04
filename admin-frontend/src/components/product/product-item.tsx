import { Button, Checkbox, NumberInput, Textarea, TextInput } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import Image from 'next/image'
import { FormEvent } from 'react'

import { useDeleteProduct } from '../../hooks/use-delete-product'
import { useUpdateProduct } from '../../hooks/use-update-product'
import { IProduct } from '../../typings/product'
import { getImageUrl } from '../../utils/get-image-url'

interface Props {
  product: IProduct
}
export const ProductItem = ({ product }: Props) => {
  const { showNotification } = useNotifications()

  const deleteProduct = useDeleteProduct()
  const updateProduct = useUpdateProduct(product.id)

  const handleProductDelete = async () => {
    try {
      const message = await deleteProduct.mutateAsync(product.id)
      showNotification({ message })
    } catch (error: any) {
      showNotification({ message: error.message })
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    // converting formdata entries to raw js object
    const formValue = Array.from(formData.entries()).reduce((acc, curr) => {
      const [key, value] = curr
      acc[key] = key === 'featured' ? (value === 'on' ? true : false) : value
      return acc
    }, {} as Record<string, any>)
    try {
      const message = await updateProduct.mutateAsync(formValue)
      showNotification({ message })
    } catch (error: any) {
      showNotification({
        title: 'Failed to update product',
        message: error.message,
        color: 'red',
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='hover:shaow-2xl flex flex-col gap-6 rounded-md bg-gray-600 p-4 lg:flex-row'
    >
      <Image
        src={getImageUrl('product', product.coverImage)}
        width={300}
        height={300}
        objectFit='cover'
        alt={product.name}
        className='rounded-md'
      />
      <div className='flex-1 space-y-4'>
        <div className='grid gap-4 lg:grid-cols-2'>
          <TextInput
            placeholder='name'
            label='Name'
            name='name'
            defaultValue={product.name}
          />
          <NumberInput
            placeholder='price'
            label='Price'
            name='price'
            defaultValue={product.price}
          />
        </div>
        <Checkbox
          label='Featured'
          name='featured'
          defaultChecked={product.featured}
        />
        <Textarea
          placeholder='description'
          label='Description'
          name='description'
          minRows={5}
          defaultValue={product.description}
        />
        <div className='flex gap-2'>
          <Button type='submit' loading={updateProduct.isLoading}>
            Update Product
          </Button>
          <Button color='red' onClick={handleProductDelete}>
            Delete Product
          </Button>
        </div>
      </div>
    </form>
  )
}
