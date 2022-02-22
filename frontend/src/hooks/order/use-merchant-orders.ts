import { useQuery } from 'react-query'

import { orderService } from '@/services/order-service'
import { IOrder } from '@/types/order'

export const useMerchantOrders = () => {
  const { data, isLoading, error } = useQuery<IOrder[]>(
    'merchant-orders',
    () => orderService.fetchOrders('merchant'),
    { initialData: [] }
  )
  return {
    orders: data ?? [],
    isLoading,
    error,
  }
}
