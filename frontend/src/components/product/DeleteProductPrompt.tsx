import { Button, Modal } from '@mantine/core'
import React, { Dispatch, FC, SetStateAction } from 'react'
import { toast } from 'react-toastify'

import { useDeleteProduct } from '@/hooks/product'

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
  const { mutateAsync } = useDeleteProduct()
  const handleProductDelete = async () => {
    try {
      await mutateAsync(id)
      toast.success(`${name} has been deleted`)
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  return (
    <Modal onClose={() => setOpened(false)} opened={opened} title={`${name}`}>
      <div>
        <h4 className='text-lg'>
          Are you sure you want to remove this product from your store ?
        </h4>
        <div className='mt-4 space-x-2'>
          {/* Hide confirm delete button untill there is no error */}
          <Button
            className='bg-red-600 hover:bg-red-500'
            onClick={handleProductDelete}
          >
            Confirm
          </Button>
          <Button onClick={() => setOpened(false)}>Cancel</Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteProductPrompt
