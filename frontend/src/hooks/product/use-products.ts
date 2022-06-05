import { useQuery } from 'react-query'

import { productService } from '@/services/product-service'
import { IProduct } from '@/types/product'

export const useProducts = (featured?: boolean, page?: number) => {
  const { data, isLoading, error } = useQuery<IProduct[]>(
    ['products', page],
    () => productService.fetchProducts(featured, page),
    { keepPreviousData: true, initialData: [] }
  )
  return {
    products: data ?? [],
    isLoading,
    error,
  }
}
export const useFeaturedProducts = () =>
  useProducts(true).products.filter(product => product.featured)
