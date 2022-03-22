import { useQuery } from 'react-query'

import { cartService } from '@/services/cart-service'
import { ICart } from '@/types/cart'

export const useCarts = () => {
  const query = useQuery<ICart[], Error>(['carts'], () =>
    cartService.fetchCarts()
  )
  return {
    ...query,
    data: query.data ?? [],
  }
}
export const useCartsLength = () => useCarts().data.length
