import { useQuery } from 'react-query'

import { productService } from '@/services/product-service'

export const useProductsSearch = (searchQuery: string) => {
  const { data, isLoading, error } = useQuery(
    ['search-products', searchQuery],
    () => productService.searchProducts(searchQuery)
  )
  return {
    products: data ?? [],
    isLoading,
    error,
  }
}
