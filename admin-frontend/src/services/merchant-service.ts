import { IMerchant, UpdateMerchantStatusPayload } from '../typings/merchant'
import { axiosClient } from '../utils/axios-client'

export const getAllMerchants = async () => {
  try {
    const { data } = await axiosClient.get<IMerchant[]>('/admin/merchants')
    console.log(data)
    return data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ?? 'Error while fetching merchants'
    )
  }
}
export const updateMerchantStatus = async (
  updateMerchantStatusPayload: UpdateMerchantStatusPayload
): Promise<string> => {
  const { id, status } = updateMerchantStatusPayload
  try {
    const { data: message } = await axiosClient.patch<string>(
      `/admin/update-merchant-status/${id}/${status}`
    )
    return message
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ?? 'Error while updating merchant status'
    )
  }
}
