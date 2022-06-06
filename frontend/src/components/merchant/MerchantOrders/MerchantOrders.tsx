import { Alert, Select } from '@mantine/core'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

import { MerchantSidebar } from '@/components/ui'
import { useMerchantOrders } from '@/hooks/order'
import { IOrder } from '@/types/order'
import { OrderStatus } from '@/types/orderStatus'

import MerchantOrderRow from './MerchantOrderRow'

const MerchantOrderList = () => {
  const router = useRouter()
  const { orders } = useMerchantOrders()
  const [filterBy, setFilterBy] = useState((router.query.show as string) ?? '')
  const filteredOrders = useMemo(
    () =>
      filterBy
        ? orders.filter(order => order.orderStatus === filterBy.toUpperCase())
        : orders,
    [filterBy, orders]
  )
  return (
    <>
      <MerchantSidebar>
        <div>
          <h4 className='heading-tertiary mb-4'>Your Orders</h4>
          <div className='my-4 flex rounded-2xl bg-gray-600 p-4'>
            <Select
              data={[
                {
                  label: 'Completed',
                  value: OrderStatus.COMPLETED,
                },
                {
                  label: 'Pending',
                  value: OrderStatus.PENDING,
                },
                {
                  label: 'Cancelled',
                  value: OrderStatus.CANCELLED,
                },
              ]}
              label='Filter orders by order status'
              onChange={value => setFilterBy(value ?? filterBy)}
              placeholder='Filter by status'
              value={filterBy}
            />
          </div>
          {/* 
              1-if there is filterBy value and there are no orders that matches the given filter,
              then display an alert saying no match found for filter value
              2-if there is no filterBy value and there are no orders,
              then display an alert saying no orders found
              3-else display the orders
          */}
          {filterBy && filteredOrders.length === 0 ? (
            <NoFilteredOrders filterKey={filterBy} />
          ) : filteredOrders.length === 0 ? (
            <NoOrders />
          ) : (
            <OrderTable orders={filteredOrders} />
          )}
        </div>
      </MerchantSidebar>
    </>
  )
}
const OrderTable = ({ orders }: { orders: IOrder[] }) => {
  const tableHeads = ['Product', 'Status', 'Date', 'Total Price', 'Ordered By']
  return (
    <div className='rounded-2xl bg-gray-600 p-4 shadow-md'>
      <table className='w-full table-auto text-left'>
        <thead className='text-xs font-semibold uppercase'>
          <tr>
            {tableHeads.map(tablehead => (
              <th className='whitespace-nowrap p-4' key={tablehead}>
                {tablehead}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-400'>
          {orders.map(order => (
            <MerchantOrderRow key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
const NoFilteredOrders = ({ filterKey }: { filterKey?: string }) => {
  return (
    <Alert
      color='yellow'
      title={`Found 0 ${filterKey} orders`}
      variant='filled'
    >
      <p>You dont have any {filterKey} orders</p>
    </Alert>
  )
}
const NoOrders = () => {
  return (
    <Alert color='yellow' title='You dont have any orders'>
      <p>Once you start receiving orders, they will be displayed here</p>
    </Alert>
  )
}
export default MerchantOrderList
