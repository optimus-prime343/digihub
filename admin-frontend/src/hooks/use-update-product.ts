import { useMutation, useQueryClient } from 'react-query'

import { updateProduct } from '../services/product-service'
import { IProduct } from '../typings/product'

export const useUpdateProduct = (productId: string) => {
  const queryClient = useQueryClient()
  return useMutation<string, Error, Partial<IProduct>>(
    updateProductInput => updateProduct(productId, updateProductInput),
    {
      onSettled: () => {
        queryClient.invalidateQueries('products')
      },
    }
  )
}
