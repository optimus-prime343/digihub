import { useQuery } from 'react-query'

import { productService } from '@/services/product-service'

export const useMerchantProducts = () => {
  const { data, error, isLoading } = useQuery(
    'merchant-products',
    () => productService.fetchMerchantProducts(),
    { initialData: [] }
  )
  return {
    products: data ?? [],
    isLoading,
    error,
  }
}
