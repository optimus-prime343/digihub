import { useMutation, useQueryClient } from 'react-query'

import { productService } from '@/services/product-service'

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  return useMutation<string, Error, string>(
    id => productService.deleteProduct(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('products')
        queryClient.invalidateQueries('merchant-products')
      },
    }
  )
}
