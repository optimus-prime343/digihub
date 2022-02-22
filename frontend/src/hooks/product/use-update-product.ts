import { useMutation, useQueryClient } from 'react-query'

import { productService } from '@/services/product-service'
import { IProduct, UpdateProductPayload } from '@/types/product'

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation<IProduct, Error, UpdateProductPayload>(
    data => productService.updateProduct(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('products')
        queryClient.invalidateQueries('merchant-products')
      },
    }
  )
}
