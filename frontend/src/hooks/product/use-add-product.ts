import { useMutation, useQueryClient } from 'react-query'

import { productService } from '@/services/product-service'
import { IProduct } from '@/types/product'

export const useAddProduct = () => {
  const queryClient = useQueryClient()
  return useMutation<IProduct, Error, FormData>(
    data => productService.addProduct(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('products')
        queryClient.invalidateQueries('merchant-products')
      },
    }
  )
}
