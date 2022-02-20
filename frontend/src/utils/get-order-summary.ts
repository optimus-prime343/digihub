import { IOrder } from '@/types/order'
import { OrderStatus } from '@/types/orderStatus'

// Generates a basic summary of order from all the orders received by the merchant
export const getOrderSummary = (orders: IOrder[]) => {
  const summary = { completed: 0, pending: 0, cancelled: 0 }
  for (const order of orders) {
    switch (order.orderStatus) {
      case OrderStatus.COMPLETED:
        summary.completed++
        break
      case OrderStatus.PENDING:
        summary.pending++
        break
      case OrderStatus.CANCELLED:
        summary.cancelled++
        break
      default:
        break
    }
  }
  return summary
}
