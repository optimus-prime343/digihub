import classNames from 'classnames'
import React, { useMemo } from 'react'
import { BsCheck2Circle } from 'react-icons/bs'
import { MdClose, MdPendingActions } from 'react-icons/md'

import { useOrder } from '~context/order'
import NextLink from '~shared/next-link'
import { OrderStatus } from '~types/orderStatus'
import { getOrderSummary } from '~utils/get-order-summary'

const OrdersOverview = () => {
  const { orders } = useOrder()
  const summary = useMemo(() => getOrderSummary(orders), [orders])
  const summaryBox = classNames(
    'bg-gray-800 p-4 flex gap-6 rounded-2xl shadow-lg'
  )
  // classnames for order status,icon and their corresponding values
  const summaryIcon = (status: string) =>
    classNames('p-2 rounded-md shadow-md', {
      'bg-green-600': status === OrderStatus.COMPLETED,
      'bg-red-600': status === OrderStatus.CANCELLED,
      'bg-blue-600': status === OrderStatus.PENDING,
    })
  const summaryText = 'text-2xl font-bold'
  const summaryValue = 'text-lg font-medium uppercase'
  const summaryInfo = 'space-y-2'
  const summaryButton = (status: OrderStatus) =>
    classNames('inline-block font-medium p-2 rounded-md hover:brightness-95', {
      'bg-green-100 text-green-600': status === OrderStatus.COMPLETED,
      'bg-blue-100 text-blue-600': status === OrderStatus.PENDING,
      'bg-red-100 text-red-600': status === OrderStatus.CANCELLED,
    })
  return (
    <div className='flex flex-col gap-6 lg:flex-row'>
      <div className={summaryBox}>
        <BsCheck2Circle
          className={summaryIcon(OrderStatus.COMPLETED)}
          size={60}
        />
        <div className={summaryInfo}>
          <h3 className={summaryValue}>Orders Completed</h3>
          <p className={summaryText}>{summary.completed}</p>
          <NextLink
            className={summaryButton(OrderStatus.COMPLETED)}
            href='/merchant/orders?show=completed'
          >
            Completed Orders
          </NextLink>
        </div>
      </div>
      <div className={summaryBox}>
        <MdPendingActions
          className={summaryIcon(OrderStatus.PENDING)}
          size={50}
        />
        <div className={summaryInfo}>
          <h3 className={summaryValue}>Pending Orders</h3>
          <p className={summaryText}>{summary.pending}</p>
          <NextLink
            className={summaryButton(OrderStatus.PENDING)}
            href='/merchant/orders?show=pending'
          >
            Pending Orders
          </NextLink>
        </div>
      </div>
      <div className={summaryBox}>
        <MdClose className={summaryIcon(OrderStatus.CANCELLED)} size={50} />
        <div className={summaryInfo}>
          <h3 className={summaryValue}>Cancelled Orders</h3>
          <p className={summaryText}>{summary.cancelled}</p>
          <NextLink
            className={summaryButton(OrderStatus.CANCELLED)}
            href='/merchant/orders?show=cancelled'
          >
            Cancelled Orders
          </NextLink>
        </div>
      </div>
    </div>
  )
}

export default OrdersOverview
