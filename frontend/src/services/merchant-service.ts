import {
  IMerchant,
  ReportMerchantPayload,
  UpdateMerchantPayload,
} from '@/types/merchant'
import { IProduct } from '@/types/product'
import { IUser } from '@/types/user'
import { axiosClient } from '@/utils/axios-client'

export class MerchantService {
  async fetchProducts(): Promise<IProduct[]> {
    try {
      const { data } = await axiosClient.get<IProduct[]>('/products/me')
      return data
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ?? 'Failed to fetch products'
      )
    }
  }
  async updateMerchant(updateMerchantPayload: UpdateMerchantPayload) {
    try {
      const { data } = await axiosClient.patch<IUser | undefined>(
        '/merchants',
        updateMerchantPayload
      )
      return data
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ?? 'Failed to update merchant'
      )
    }
  }
  async reportMerchant(reportMerchantPayload: ReportMerchantPayload) {
    try {
      const { data: message } = await axiosClient.post<string>(
        '/reports',
        reportMerchantPayload
      )
      return message
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ?? 'Failed to report merchant'
      )
    }
  }
  async withdraw(amount: number) {
    try {
      const { data } = await axiosClient.patch<IMerchant>(
        '/merchants/withdraw-amount',
        {
          amount,
        }
      )
      return data
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Failed to withdraw')
    }
  }
}
export const merchantService = new MerchantService()
