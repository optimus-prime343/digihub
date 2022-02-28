import { useMutation, useQueryClient } from 'react-query'

import { orderService } from '@/services/order-service'
import { AddToCartPayload } from '@/types/cart'
import { IOrder } from '@/types/order'

export const useCreateOrder = () => {
  const queryClient = useQueryClient()
  return useMutation<IOrder, Error, AddToCartPayload>(
    createOrderPayload => orderService.createOrder(createOrderPayload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user-orders')
      },
    }
  )
}
