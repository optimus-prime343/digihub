import { Badge } from '@mantine/core'
import { format } from 'date-fns'
import Image from 'next/image'

import { NextLink } from '@/components/core'
import { IOrder } from '@/types/order'
import { OrderStatus } from '@/types/orderStatus'
import { getProductImageUrl } from '@/utils/getImageUrl'

interface Props {
  order: IOrder
}
const OrderListItem = ({ order }: Props) => {
  const orderStatusColor = {
    [OrderStatus.PENDING]: 'yellow',
    [OrderStatus.CANCELLED]: 'red',
    [OrderStatus.COMPLETED]: 'green',
  }

  return (
    <>
      <div className='flex flex-col items-start gap-4 rounded-md bg-gray-600 p-4 lg:flex-row lg:items-center lg:gap-24'>
        <Image
          alt={`${order.product.name}`}
          className='rounded-md'
          height={150}
          objectFit='cover'
          src={getProductImageUrl(order.product.coverImage)}
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
        <Badge color={orderStatusColor[order.orderStatus]}>
          {order.orderStatus}
        </Badge>
      </div>
    </>
  )
}

export default OrderListItem
