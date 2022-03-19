import { Table } from '@mantine/core'
import { format } from 'date-fns'

import { Sidebar } from '../components/sidebar'
import { useOrders } from '../hooks/use-orders'

const OrderListPage = () => {
  const { data = [] } = useOrders()
  const rows = data.map(order => (
    <tr key={order.id}>
      <td>{order.id}</td>
      <td>{order.product.name}</td>
      <td>{order.quantity}</td>
      <td>{order.totalPrice}</td>
      <td>{order.user.username}</td>
      <td>{order.merchant.businessName}</td>
      <td>{order.orderStatus}</td>
      <td>{format(new Date(order.createdAt), 'PPP')}</td>
    </tr>
  ))
  return (
    <Sidebar>
      <Table striped verticalSpacing='md'>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Ordered by</th>
            <th>Order from</th>
            <th>Status</th>
            <th>Created on</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Sidebar>
  )
}

export default OrderListPage
