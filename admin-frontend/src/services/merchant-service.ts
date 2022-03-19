import { IMerchant } from '../typings/merchant'
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
