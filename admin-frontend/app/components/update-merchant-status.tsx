import { Select } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'

import { useUpdateMerchantStatus } from '~/hooks/merchant/use-update-merchant-status'

interface Props {
	initialStatus: string
	merchantId: string
}
export const UpdateMerchantStatus = ({ initialStatus, merchantId }: Props) => {
	const { showNotification } = useNotifications()
	const updateMerchantStatus = useUpdateMerchantStatus()
	const handleChange = async (value: string) => {
		try {
			const message = await updateMerchantStatus.mutateAsync({
				id: merchantId,
				status: value,
			})
			showNotification({ message })
		} catch (error: any) {
			showNotification({
				color: 'red',
				message: error.message,
			})
		}
	}
	return <Select data={data} defaultValue={initialStatus} onChange={handleChange} />
}
const data = [
	{
		label: 'Pending',
		value: 'PENDING',
	},
	{
		label: 'Approved',
		value: 'APPROVED',
	},
	{
		label: 'Rejected',
		value: 'REJECTED',
	},
	{
		label: 'Blocked',
		value: 'BLOCKED',
	},
]
