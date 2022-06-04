import { Button, Modal } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import React, { Dispatch, FC, SetStateAction } from 'react'

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
  const { showNotification } = useNotifications()
  const { mutateAsync } = useDeleteProduct()
  const handleProductDelete = async () => {
    try {
      await mutateAsync(id)
      showNotification({
        message: `${name} has been deleted`,
      })
    } catch (error: any) {
      showNotification({ message: error.message, color: 'red' })
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
          <Button color='red' onClick={handleProductDelete}>
            Confirm
          </Button>
          <Button onClick={() => setOpened(false)} variant='outline'>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteProductPrompt
