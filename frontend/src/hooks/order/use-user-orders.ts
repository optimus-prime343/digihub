import { useQuery } from 'react-query'

import { orderService } from '@/services/order-service'
import { IOrder } from '@/types/order'

export const useUserOrders = () => {
  return useQuery<IOrder[], Error>(['user-orders'], () =>
    orderService.fetchOrders('user')
  )
}
