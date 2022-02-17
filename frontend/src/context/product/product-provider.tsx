/* eslint-disable unicorn/no-useless-undefined */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from 'next/router'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'

import { useAuth } from '~context/auth'
import { productService } from '~services/product-service'
import { IProduct, UpdateProductPayload } from '~types/product'

import { IProductContext, productContext } from './product-context'

export const ProductProvider: FC = ({ children }) => {
  const { user } = useAuth()
  const router = useRouter()
  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const merchantProducts = useMemo(
    () =>
      products.filter(product => product.merchant?.id === user?.merchant?.id),
    [products, user?.merchant?.id]
  )

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const products = await productService.fetchProducts()
      setProducts(products)
    } catch (error: any) {
      setError(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const addProduct = useCallback(
    async (formData: FormData, onAdd?: () => void) => {
      setLoading(true)
      try {
        const product = await productService.addProduct(formData)
        setProducts([product, ...products])
        onAdd?.()
      } catch (error: any) {
        setError(error.response.data.message)
      } finally {
        setLoading(false)
      }
    },
    [products]
  )
  const deleteProduct = async (id: string, onDelete?: () => void) => {
    try {
      await productService.deleteProduct(id)
      setProducts(currentProducts =>
        currentProducts.filter(product => product.id !== id)
      )
      onDelete?.()
    } catch (error: any) {
      setError(error.response.data?.message ?? 'Failed to delete product')
    } finally {
      setLoading(false)
    }
  }
  const updateProduct = useCallback(
    async (
      updateProductPayload: UpdateProductPayload,
      onUpdate?: () => void
    ) => {
      try {
        const updatedProduct = await productService.updateProduct(
          updateProductPayload
        )
        setProducts(currentProducts =>
          currentProducts.map(product =>
            product.id === updateProductPayload.id ? updatedProduct : product
          )
        )
        onUpdate?.()
      } catch (error: any) {
        setError(error.response.data?.message ?? 'Failed to update product')
      } finally {
        setLoading(false)
      }
    },
    []
  )
  //side effects
  useEffect(() => {
    // fetch merchant components when page is first mounted
    fetchProducts()
  }, [fetchProducts, user])

  useEffect(() => {
    // clear any previous error on route change,so error of one page is not displayed on another page
    setError(undefined)
  }, [router.pathname])

  const value: IProductContext = {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    merchantProducts,
    deleteProduct,
    updateProduct,
  }
  return (
    <productContext.Provider value={value}>{children}</productContext.Provider>
  )
}
