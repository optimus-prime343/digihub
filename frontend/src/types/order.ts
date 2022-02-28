import { OrderStatus } from './orderStatus'
import { IProduct } from './product'

export interface IOrder {
  id: string
  quantity: number
  totalPrice: number
  createdAt: string
  orderStatus: OrderStatus
  product: IProduct
}
export interface UpdateOrderPayload {
  id: string
  status: OrderStatus
  message: string
}
