import { IOrder } from '@/types/order'
import { OrderStatus } from '@/types/orderStatus'

export const hasPurchasedProduct = (
  orders: IOrder[],
  productId: string
): boolean => {
  return orders
    .filter(order => order.orderStatus === OrderStatus.COMPLETED)
    .some(order => order.product.id === productId)
}
