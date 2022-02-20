import { IOrder, UpdateOrderPayload } from '@/types/order'
import { axiosClient } from '@/utils/axiosClient'

export class OrderService {
  async fetchOrders(whose: 'merchant' | 'user') {
    const { data: orders } = await axiosClient.get<IOrder[]>(
      `/orders/${whose}-orders`
    )
    return orders
  }
  async updateOrder(updateOrderPayload: UpdateOrderPayload) {
    const { data: order } = await axiosClient.patch<IOrder>(
      '/orders/update-order',
      updateOrderPayload
    )
    return order
  }
}
export const orderService = new OrderService()
