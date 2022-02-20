import { Alert, Button, Select, Textarea } from '@mantine/core'
import React, { FC, FormEvent, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import { useOrder } from '@/context/order'
import { OrderStatus } from '@/types/orderStatus'

interface IUpdateOrderFormProperties {
  id: string
  productName: string
  customerName: string
  onOrderUpdated: () => void
}

const UpdateOrderForm: FC<IUpdateOrderFormProperties> = ({
  id,
  productName,
  customerName,
  onOrderUpdated,
}) => {
  const { updateOrder, error, loading } = useOrder()

  const [status, setStatus] = useState<string | null>('PENDING')
  const [message, setMessage] = useState('')

  const orderStatus = useMemo(
    () => [
      { value: 'CANCELLED', label: 'Cancelled' },
      { value: 'COMPLETED', label: 'Completed' },
    ],
    []
  )
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status) {
      updateOrder({ id, status: status as OrderStatus, message }, () => {
        onOrderUpdated()
        toast.success('Order updated successfully')
      })
    }
  }
  return (
    <div>
      <form className='space-y-4' onSubmit={handleSubmit}>
        <h4 className='text-xl font-medium'>
          {`${productName} by ${customerName}`}
        </h4>
        {error && (
          <Alert color='red' variant='filled'>
            {error}
          </Alert>
        )}
        <Select
          data={orderStatus}
          label='Order status'
          onChange={setStatus}
          placeholder='Choose one'
          value={status}
        />
        <Textarea
          label='Message'
          minRows={5}
          onChange={event => setMessage(event.currentTarget.value)}
          placeholder='Please mention reason for cancelling order or order completed message'
          value={message}
        />
        <Button
          className='bg-indigo-600'
          fullWidth
          loading={loading}
          type='submit'
        >
          Update
        </Button>
      </form>
    </div>
  )
}

export default UpdateOrderForm
