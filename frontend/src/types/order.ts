import { OrderStatus } from './orderStatus'
import { IProduct } from './product'
import { IUser } from './user'
export interface IOrder {
  id: string
  quantity: number
  totalPrice: number
  createdAt: string
  orderStatus: OrderStatus
  product: IProduct
  user: IUser
}
export interface UpdateOrderPayload {
  id: string
  message: string
  status: OrderStatus
}
