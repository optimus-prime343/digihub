import { useMutation, useQueryClient } from 'react-query'

import { reviewService } from '@/services/review-service'
import { IProductReview, UpdateReviewPayload } from '@/types/product'

export const useUpdateReview = (productId: string) => {
  const queryClient = useQueryClient()
  return useMutation<IProductReview, Error, UpdateReviewPayload>(
    updateReviewPayload => reviewService.updateReview(updateReviewPayload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['product', productId])
      },
    }
  )
}
