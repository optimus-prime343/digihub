import { useMutation, useQueryClient } from 'react-query'

import { cartService } from '@/services/cart-service'
import { ICart, UpdateCartQuantityPayload } from '@/types/cart'

export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient()
  return useMutation<ICart, Error, UpdateCartQuantityPayload>(
    updateCartQuantityPayload =>
      cartService.updateCartQuantity(updateCartQuantityPayload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('carts')
      },
    }
  )
}
