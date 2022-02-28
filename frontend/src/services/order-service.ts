import { AddToCartPayload } from '@/types/cart'
import { IOrder, UpdateOrderPayload } from '@/types/order'
import { axiosClient } from '@/utils/axiosClient'

export class OrderService {
  async fetchOrders(whose: 'merchant' | 'user') {
    try {
      const { data: orders } = await axiosClient.get<IOrder[]>(
        `/orders/${whose}-orders`
      )
      return orders
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Failed to fetch orders')
    }
  }
  async updateOrder(updateOrderPayload: UpdateOrderPayload) {
    try {
      const { data: order } = await axiosClient.patch<IOrder>(
        '/orders/update-order',
        updateOrderPayload
      )
      return order
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Failed to update order')
    }
  }
  async createOrder(createOrderPayload: AddToCartPayload) {
    try {
      const { data } = await axiosClient.post<IOrder>(
        '/orders',
        createOrderPayload
      )
      return data
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Failed to create order')
    }
  }
  async cancelOrder(orderId: string) {
    try {
      const { data } = await axiosClient.post<string>('/orders/cancel-order', {
        orderId,
      })
      return data
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Failed to cancel order')
    }
  }
}
export const orderService = new OrderService()
