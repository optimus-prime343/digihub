import { useMutation, useQueryClient } from 'react-query'

import { orderService } from '@/services/order-service'
import { UpdateOrderPayload } from '@/types/order'

export const useUpdateOrder = () => {
  const queryClient = useQueryClient()
  return useMutation<unknown, Error, UpdateOrderPayload>(
    data => orderService.updateOrder(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('merchant-orders')
      },
    }
  )
}
