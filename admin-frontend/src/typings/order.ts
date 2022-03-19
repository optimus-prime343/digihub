import { IMerchant } from './merchant'
import { IProduct } from './product'
import { IUser } from './user'

export interface IOrder {
  id: string
  quantity: number
  totalPrice: number
  createdAt: string
  orderStatus: string
  product: IProduct
  user: IUser
  merchant: IMerchant
}
