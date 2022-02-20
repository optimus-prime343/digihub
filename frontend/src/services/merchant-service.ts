import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

import { IMerchant, UpdateMerchantPayload } from '@/types/merchant'
import { IProduct } from '@/types/product'
import { IUser } from '@/types/user'
import { axiosClient } from '@/utils/axiosClient'

export class MerchantService {
  async fetchProducts(): Promise<IProduct[]> {
    try {
      const { data } = await axiosClient.get<IProduct[]>('/products/me')
      return data
    } catch (_error) {
      const error = _error as unknown as AxiosError
      toast.error(error.response?.data.message)
      return []
    }
  }
  async updateMerchant(updateMerchantPayload: UpdateMerchantPayload) {
    const { data } = await axiosClient.patch<IUser | undefined>(
      '/merchants',
      updateMerchantPayload
    )
    return data
  }
  async withdraw(amount: number) {
    const { data } = await axiosClient.patch<IMerchant>(
      '/merchants/withdraw-amount',
      {
        amount,
      }
    )
    return data
  }
}
export const merchantService = new MerchantService()
