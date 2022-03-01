import { useQueryClient } from 'react-query'

import { IProduct } from '@/types/product'

/**
 * @description Recommend similar products based on the product tags
 */
export const useRecommendProducts = (tags: string[]) => {
  const queryClient = useQueryClient()
  const products = queryClient.getQueryData<IProduct[]>(['products', 1]) ?? []
  console.log(products)
  return products.filter(product => {
    return product.tags.some(tag => tags.includes(tag))
  })
}
