import { Alert } from '@mantine/core'

import { IOrder } from '@/types/order'

import OrderListItem from './OrderListItem'

interface Props {
  orders: IOrder[]
}
const OrderList = ({ orders }: Props) => {
  if (orders.length === 0) return <Alert>You have no orders.</Alert>
  return (
    <div className='space-y-2 lg:space-y-4'>
      {orders.map(order => (
        <OrderListItem key={order.id} order={order} />
      ))}
    </div>
  )
}

export default OrderList
