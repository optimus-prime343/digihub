import { useMutation, useQueryClient } from 'react-query'

import { cartService } from '@/services/cart-service'
import { AddToCartPayload, ICart } from '@/types/cart'

export const useAddToCart = () => {
  const queryClient = useQueryClient()
  return useMutation<ICart, Error, AddToCartPayload>(
    addToCartPayload => cartService.addToCart(addToCartPayload),
    { onSuccess: () => queryClient.invalidateQueries('carts') }
  )
}
