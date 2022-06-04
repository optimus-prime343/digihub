import { IProduct } from '../typings/product'
import { axiosClient } from '../utils/axios-client'

export const getProducts = async (): Promise<IProduct[]> => {
  try {
    const { data } = await axiosClient.get<IProduct[]>('/admin/products')
    return data
  } catch (error: any) {
    throw new Error(error.response?.data?.message ?? 'Error fetching products')
  }
}
export const updateProduct = async (
  productId: string,
  updatedProductInput: Partial<IProduct>
): Promise<string> => {
  try {
    const { data } = await axiosClient.patch<string>(
      `/admin/update-product/${productId}`,
      updatedProductInput
    )
    return data
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? 'Error updating product')
  }
}
