import { useQuery } from 'react-query'

import { getProducts } from '../services/product-service'
import { IProduct } from '../typings/product'

export const useProducts = (initialValue?: IProduct[]) => {
  return useQuery<IProduct[], Error>('products', getProducts, {
    initialData: initialValue,
  })
}
