import { Button, Modal } from '@mantine/core'
import classNames from 'classnames'
import { format } from 'date-fns'
import Image from 'next/image'
import { useState } from 'react'
import { BiMessageAlt } from 'react-icons/bi'
import { MdOutlineCancel } from 'react-icons/md'
import { toast } from 'react-toastify'

import { NextLink } from '@/components/core'
import { useCancelOrder } from '@/hooks/order'
import { IOrder } from '@/types/order'
import { OrderStatus } from '@/types/orderStatus'
import { getProductImageUrl } from '@/utils/getImageUrl'

interface Props {
  order: IOrder
}
const OrderListItem = ({ order }: Props) => {
  const [opened, setOpened] = useState(false)
  const { mutateAsync: cancelOrder, isLoading } = useCancelOrder()
  const orderStatus = classNames('p-2 rounded-md', {
    'bg-green-600': order.orderStatus === OrderStatus.COMPLETED,
    'bg-yellow-600': order.orderStatus === OrderStatus.PENDING,
    'bg-red-600': order.orderStatus === OrderStatus.CANCELLED,
  })
  const handleCancelOrder = async () => {
    try {
      const message = await cancelOrder(order.id)
      toast.success(message)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
  return (
    <>
      <Modal
        onClose={() => setOpened(false)}
        opened={opened}
        title='Cancel Order'
      >
        <p>Are you sure you want to cancel this order?</p>
        <div className='mt-4 space-x-2'>
          <Button
            className='bg-red-600 hover:bg-red-500'
            loading={isLoading}
            onClick={handleCancelOrder}
          >
            Confirm
          </Button>
          <Button onClick={() => setOpened(false)} variant='outline'>
            Cancel
          </Button>
        </div>
      </Modal>
      <div className='flex flex-col items-start gap-4 rounded-md bg-gray-600/50 p-4 lg:flex-row lg:items-center lg:gap-24'>
        <Image
          alt={`${order.product.name}`}
          className='rounded-md'
          height={150}
          objectFit='cover'
          src={getProductImageUrl(order.product.images[0])}
          width={300}
        />
        <div className='w-full max-w-sm space-y-2'>
          <h3 className='text-xl font-bold'>
            <NextLink href={`/products/${order.product.id}`}>
              {order.product.name}
            </NextLink>
          </h3>
          <p>Quantity: {order.quantity}</p>
          <p>Subtotal : Rs {order.totalPrice}</p>
          <p>Ordered on {format(new Date(order.createdAt), 'PPP')}</p>
        </div>
        <p className={orderStatus}>{order.orderStatus}</p>
        {order.orderStatus === OrderStatus.PENDING && (
          <div className='flex space-x-2'>
            <Button leftIcon={<BiMessageAlt />} variant='outline'>
              Contact Seller
            </Button>
            <Button
              className='bg-red-600 hover:bg-red-500'
              leftIcon={<MdOutlineCancel />}
              onClick={() => setOpened(true)}
            >
              Cancel Order
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

export default OrderListItem
