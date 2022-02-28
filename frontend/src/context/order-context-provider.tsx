import { createContext, ReactNode, useContext, useState } from 'react'

interface IOrderContext {
  quantity: number
  productId: string
  setQuantity: (quantity: number) => void
  setProductId: (productId: string) => void
}

const orderContext = createContext<IOrderContext>({} as IOrderContext)

export const OrderContextProvider = ({ children }: { children: ReactNode }) => {
  const [quantity, setQuantity] = useState(1)
  const [productId, setProductId] = useState('')
  const value: IOrderContext = {
    quantity,
    productId,
    setQuantity,
    setProductId,
  }
  return <orderContext.Provider value={value}>{children}</orderContext.Provider>
}
export const useOrderContext = () => useContext(orderContext)
