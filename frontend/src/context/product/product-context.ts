import { createContext, useContext } from 'react'

import { IProduct, UpdateProductPayload } from '@/types/product'

export interface IProductContext {
  merchantProducts: IProduct[]
  products: IProduct[]
  error?: string
  loading: boolean
  fetchProducts: () => Promise<void>
  addProduct: (formData: FormData, onAdd?: () => void) => Promise<void>
  updateProduct: (
    updateProductPayload: UpdateProductPayload,
    onUpdate?: () => void
  ) => Promise<void>
  deleteProduct: (id: string, onDelete?: () => void) => Promise<void>
}
export const productContext = createContext<IProductContext>(
  {} as IProductContext
)
export const useProduct = () => useContext(productContext)
