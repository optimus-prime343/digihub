import { useMutation, useQueryClient } from 'react-query'

import { orderService } from '@/services/order-service'

export const useCancelOrder = () => {
  const queryClient = useQueryClient()
  return useMutation<string, Error, string>(
    orderId => orderService.cancelOrder(orderId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user-orders')
      },
    }
  )
}
