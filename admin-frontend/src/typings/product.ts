import { IMerchant } from './merchant'
import { IUser } from './user'

export interface IProduct {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  coverImage: string
  totalRatings: number
  averageRating: number
  createdAt: string
  updatedAt?: string
  tags: string[]
  merchant: IMerchant
  reviews: IReview[]
}

export interface IReview {
  id: string
  review: string
  rating: number
  createdAt: string
  user: IUser
}
