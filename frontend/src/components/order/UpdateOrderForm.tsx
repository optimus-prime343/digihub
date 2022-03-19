import { Button, Textarea } from '@mantine/core'
import React, { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

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
  const { mutateAsync, isLoading } = useUpdateOrder()
  const [message, setMessage] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await mutateAsync({ id, message, status: OrderStatus.COMPLETED })
      toast.success('Order updated successfully')
      onOrderUpdated()
      socket.emit('order-completed', {
        productName,
      })
    } catch (error: any) {
      toast.error(error.message)
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
