import { IProduct } from '../typings/product'
import { axiosClient } from '../utils/axios-client'

export const getProducts = async (): Promise<IProduct[]> => {
  try {
    const { data } = await axiosClient.get<IProduct[]>('/products')
    return data
  } catch (error: any) {
    throw new Error(error.response?.data?.message ?? 'Error fetching products')
  }
}
