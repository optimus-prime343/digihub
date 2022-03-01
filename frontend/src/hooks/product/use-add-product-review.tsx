import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'

import { productService } from '@/services/product-service'
import { AddReviewPayload, IProductReview } from '@/types/product'

export const useAddProductReview = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation<IProductReview, Error, AddReviewPayload>(
    addProductReviewPayload =>
      productService.addProductReview(addProductReviewPayload),
    {
      onSuccess: () => {
        // once a review is added, we need to refetch the product reviews based on the product id
        queryClient.invalidateQueries(['product', router.query.id as string])
      },
    }
  )
}
