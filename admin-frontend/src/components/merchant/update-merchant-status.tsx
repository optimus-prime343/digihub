import { LoadingOverlay, Select } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'

import { useUpdateMerchantStatus } from '../../hooks/use-update-merchant-status'
import { MerchantStatus } from '../../typings/merchant'

interface Props {
  id: string
  initialStatus: MerchantStatus
}
export const UpdateMerchantStatus = ({ initialStatus, id }: Props) => {
  const { showNotification } = useNotifications()
  const updateMerchantStatus = useUpdateMerchantStatus()

  const handleChange = async (value: string) => {
    try {
      const message = await updateMerchantStatus.mutateAsync({
        id,
        status: value as MerchantStatus,
      })
      showNotification({
        message,
      })
    } catch (error: any) {
      showNotification({ message: error.message, color: 'red' })
    }
  }
  return (
    <>
      <LoadingOverlay visible={updateMerchantStatus.isLoading} />
      <Select data={data} defaultValue={initialStatus} onChange={handleChange} />
    </>
  )
}

const data = Object.entries(MerchantStatus).map(([key, value]) => ({
  label: key,
  value,
}))
