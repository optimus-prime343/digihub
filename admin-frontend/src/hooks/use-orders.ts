import { useQuery } from 'react-query'

import { IOrder } from '../typings/order'
import { axiosClient } from '../utils/axios-client'

export const useOrders = () => {
  return useQuery<IOrder[]>('orders', async () => {
    try {
      const { data } = await axiosClient.get<IOrder[]>('/admin/orders')
      return data ?? []
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Error fetching orders')
    }
  })
}
