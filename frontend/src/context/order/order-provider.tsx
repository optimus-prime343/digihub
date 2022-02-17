/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useCallback, useEffect, useState } from 'react'

import { useAuth } from '~context/auth'
import { orderService } from '~services/order-service'
import { IOrder, UpdateOrderPayload } from '~types/order'
import { UserRole } from '~types/user'

import { IOrderContext, orderContext } from './order-context'

const OrderProvider: FC = ({ children }) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [orders, setOrders] = useState<IOrder[]>([])

  const fetchOrders = useCallback(async () => {
    try {
      if (user) {
        const orders = await orderService.fetchOrders(
          user.role === UserRole.MERCHANT ? 'merchant' : 'user'
        )
        setOrders(orders)
      }
    } catch (error: any) {
      setError(error.response.data?.message ?? 'Error fetching orders')
    } finally {
      setLoading(false)
    }
  }, [user])
  const updateOrder = useCallback(
    async (updateOrderPayload: UpdateOrderPayload, onUpdate?: () => void) => {
      setLoading(true)
      try {
        const updatedorder = await orderService.updateOrder(updateOrderPayload)
        setOrders(previousOrders =>
          previousOrders.map(order =>
            order.id === updatedorder.id ? updatedorder : order
          )
        )
        onUpdate?.()
      } catch (error: any) {
        setError(error.response.data?.message ?? 'Error updating order')
      } finally {
        setLoading(false)
      }
    },
    []
  )

  //side effects
  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])
  const value: IOrderContext = {
    orders,
    loading,
    error,
    fetchOrders,
    updateOrder,
  }
  return <orderContext.Provider value={value}>{children}</orderContext.Provider>
}

export default OrderProvider
