import { createContext, useContext } from 'react'

import { IOrder, UpdateOrderPayload } from '~types/order'

export interface IOrderContext {
  orders: IOrder[]
  loading: boolean
  error?: string
  fetchOrders: () => Promise<void>
  updateOrder: (
    updateOrderPayload: UpdateOrderPayload,
    onUpdate?: () => void
  ) => Promise<void>
}
export const orderContext = createContext<IOrderContext>({} as IOrderContext)

export const useOrder = () => useContext(orderContext)
