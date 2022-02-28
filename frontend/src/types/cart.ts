import { IProduct } from './product'

export interface ICart {
  id: string
  quantity: number
  product: IProduct
}
export interface AddToCartPayload {
  productId: string
  quantity: number
}
export interface UpdateCartQuantityPayload {
  id: string
  quantity: number
}
