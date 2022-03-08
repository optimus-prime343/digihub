import { useMutation, useQueryClient } from 'react-query'

import { reviewService } from '@/services/review-service'
import { AddReviewPayload, IProductReview } from '@/types/product'

export const useAddReview = (productId: string) => {
  const queryClient = useQueryClient()
  return useMutation<IProductReview, Error, AddReviewPayload>(
    addProductReviewPayload => reviewService.addReview(addProductReviewPayload),
    {
      onSuccess: () => {
        // once a review is added, we need to refetch the product reviews based on the product id
        queryClient.invalidateQueries(['product', productId])
      },
    }
  )
}
