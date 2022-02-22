import { Button, Select, Textarea } from '@mantine/core'
import React, { FC, FormEvent, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import { useUpdateOrder } from '@/hooks/order'
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
  const { mutateAsync, isLoading } = useUpdateOrder()

  const [status, setStatus] = useState<string | null>('PENDING')
  const [message, setMessage] = useState('')

  const orderStatus = useMemo(
    () => [
      { value: 'CANCELLED', label: 'Cancelled' },
      { value: 'COMPLETED', label: 'Completed' },
    ],
    []
  )
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status) {
      try {
        await mutateAsync({ id, status: status as OrderStatus, message })
        toast.success('Order updated successfully')
        onOrderUpdated()
      } catch (error: any) {
        toast.error(error.message)
      }
    }
  }
  return (
    <div>
      <form className='space-y-4' onSubmit={handleSubmit}>
        <h4 className='text-xl font-medium'>
          {`${productName} by ${customerName}`}
        </h4>
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
          loading={isLoading}
          type='submit'
        >
          Update
        </Button>
      </form>
    </div>
  )
}

export default UpdateOrderForm
