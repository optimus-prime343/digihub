import {
  AddReviewPayload,
  DeleteReviewPayload,
  IProductReview,
  UpdateReviewPayload,
} from '@/types/product'
import { axiosClient } from '@/utils/axios-client'

class ReviewService {
  async addReview(addReviewPayload: AddReviewPayload) {
    try {
      const { data } = await axiosClient.post<IProductReview>(
        '/reviews',
        addReviewPayload
      )
      return data
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Failed to add review')
    }
  }
  async deleteReview(deleteReviewPayload: DeleteReviewPayload) {
    const { productId, reviewId } = deleteReviewPayload
    try {
      const { data: message } = await axiosClient.delete<string>(
        `/reviews/${reviewId}/${productId}`
      )
      return message
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ?? 'Failed to delete review'
      )
    }
  }
  async updateReview(updateReviewPayload: UpdateReviewPayload) {
    try {
      const { reviewId, productId, ...rest } = updateReviewPayload
      const { data } = await axiosClient.patch<IProductReview>(
        `/reviews/${reviewId}/${productId}`,
        rest
      )
      return data
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ?? 'Failed to update review'
      )
    }
  }
}

export const reviewService = new ReviewService()
