import { Alert, Button, Modal } from '@mantine/core'
import React, { Dispatch, FC, SetStateAction } from 'react'
import toast from 'react-hot-toast'

import { useProduct } from '@/context/product'

interface IDeleteProductPromptProperties {
  id: string
  name: string
  opened: boolean
  setOpened: Dispatch<SetStateAction<boolean>>
}

const DeleteProductPrompt: FC<IDeleteProductPromptProperties> = ({
  id,
  name,
  opened,
  setOpened,
}) => {
  const { deleteProduct, error } = useProduct()
  const handleProductDelete = async () => {
    await deleteProduct(id, () => {
      toast.success('Product deleted successfully')
      setOpened(false)
    })
  }
  return (
    <Modal onClose={() => setOpened(false)} opened={opened} title={`${name}`}>
      <div>
        <h4 className='text-lg'>
          Are you sure you want to remove this product from your store ?
        </h4>
        {error && (
          <Alert className='mt-2' color='red' variant='filled'>
            {error}
          </Alert>
        )}
        <div className='mt-4 space-x-2'>
          {/* Hide confirm delete button untill there is no error */}
          {!error && (
            <Button
              className='bg-red-600 hover:bg-red-500'
              onClick={handleProductDelete}
            >
              Confirm
            </Button>
          )}
          <Button className='bg-indigo-600' onClick={() => setOpened(false)}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteProductPrompt
