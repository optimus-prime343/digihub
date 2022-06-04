import { IUser } from '@/types/user'

import { IMerchant } from './merchant'
export interface IProductCategory {
  name: string
}
export interface IProductReview {
  id: string
  review: string
  rating: number
  createdAt: string
  user: IUser
}
export interface IProduct {
  id: string
  name: string
  description: string
  price: number
  coverImage: string
  totalRatings: number
  averageRating: number
  merchant: IMerchant
  quantity: number
  featured: boolean
  tags: string[]
  reviews: IProductReview[]
  createdAt: string
  updatedAt: string
}
export interface UpdateProductPayload {
  id: string
  name: string
  description: string
  price: number
}
export interface AddReviewPayload {
  productId: string
  review: string
  rating: number
}
export interface DeleteReviewPayload {
  reviewId: string
  productId: string
}
export interface UpdateReviewPayload {
  productId: string
  reviewId: string
  review: string
  rating: number
}
