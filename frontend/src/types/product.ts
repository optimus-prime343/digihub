import { IMerchant } from './merchant'

export interface IProduct {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  totalRatings: number
  averageRating: number
  merchant: IMerchant
}
export interface UpdateProductPayload {
  id: string
  name: string
  description: string
  price: number
}
