import { IMerchant, UpdateMerchantStatusPayload } from '~/typings/merchant'
import { axiosClient } from '~/utils/axios-client'

export const fetchMerchants = async () => {
	try {
		const { data: merchants } = await axiosClient.get<IMerchant[]>(
			'/admin/merchants'
		)
		return merchants
	} catch (error: any) {
		throw new Error(error.response?.data?.message ?? 'Error fetching merchants')
	}
}
export const updateMerchantStatus = async ({
	status,
	id,
}: UpdateMerchantStatusPayload) => {
	try {
		const { data: message } = await axiosClient.patch<string>(
			`/admin/update-merchant-status/${id}/${status}`
		)
		return message
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message ?? 'Error updating merchant status'
		)
	}
}
