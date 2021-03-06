import { Button, Textarea } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import { randTextRange } from '@ngneat/falso'
import React, { FormEvent, useState } from 'react'

import { useUpdateOrder } from '@/hooks/order'
import { OrderStatus } from '@/types/orderStatus'
import { socket } from '@/utils/socket'

interface Props {
  id: string
  productName: string
  customerName: string
  onOrderUpdated: () => void
}

const UpdateOrderForm = ({
  id,
  productName,
  customerName,
  onOrderUpdated,
}: Props) => {
  const { showNotification } = useNotifications()
  const { mutateAsync, isLoading } = useUpdateOrder()
  const [message, setMessage] = useState(randTextRange({ min: 100, max: 200 }))

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await mutateAsync({ id, message, status: OrderStatus.COMPLETED })
      showNotification({ message: 'Order updated successfully' })
      onOrderUpdated()
      socket.emit('order-completed', {
        productName,
      })
    } catch (error: any) {
      showNotification({ message: error.message, color: 'red' })
    }
  }
  return (
    <div>
      <form className='space-y-4' onSubmit={handleSubmit}>
        <h4 className='text-xl font-medium'>
          {`${productName} by ${customerName}`}
        </h4>
        <Textarea
          label='Message'
          minRows={5}
          onChange={event => setMessage(event.currentTarget.value)}
          value={message}
        />
        <Button fullWidth loading={isLoading} type='submit'>
          Mark as completed
        </Button>
      </form>
    </div>
  )
}

export default UpdateOrderForm
