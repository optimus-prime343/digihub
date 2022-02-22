import { useMutation, useQueryClient } from 'react-query'

import { merchantService } from '@/services/merchant-service'
import { UpdateMerchantPayload } from '@/types/merchant'

export const useUpdateMerchant = () => {
  const queryClient = useQueryClient()
  return useMutation<unknown, unknown, UpdateMerchantPayload>(
    data => merchantService.updateMerchant(data),
    { onSettled: () => queryClient.invalidateQueries('user') }
  )
}
