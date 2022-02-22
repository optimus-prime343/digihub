import { useQuery } from 'react-query'

import { productService } from '@/services/product-service'
import { IProduct } from '@/types/product'

export const useProducts = (page?: number) => {
  const { data, isLoading, error } = useQuery<IProduct[]>(
    ['products', page],
    () => productService.fetchProducts(page),
    { keepPreviousData: true, initialData: [] }
  )
  return {
    products: data ?? [],
    isLoading,
    error,
  }
}
