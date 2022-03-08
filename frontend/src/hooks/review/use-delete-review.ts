import { useMutation, useQueryClient } from 'react-query'

import { reviewService } from '@/services/review-service'
import { DeleteReviewPayload } from '@/types/product'

// productid is required to fetch the updated reviews after a review is deleted
export const useDeleteReview = (productId: string) => {
  const queryClient = useQueryClient()
  return useMutation<string, Error, DeleteReviewPayload>(
    deleteReviewPayload => reviewService.deleteReview(deleteReviewPayload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['product', productId])
      },
    }
  )
}
