import { useMutation, useQueryClient } from 'react-query'

import { cartService } from '@/services/cart-service'

export const useDeleteCart = () => {
  const queryClient = useQueryClient()
  return useMutation<string, Error, string>(
    cartId => cartService.deleteCart(cartId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('carts')
      },
    }
  )
}
