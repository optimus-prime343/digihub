import { useMutation, useQueryClient } from 'react-query'

import { updateMerchantStatus } from '../services/merchant-service'
import { UpdateMerchantStatusPayload } from '../typings/merchant'

export const useUpdateMerchantStatus = () => {
  const queryClient = useQueryClient()
  return useMutation<string, Error, UpdateMerchantStatusPayload>(
    updateMerchantStatusPayload => updateMerchantStatus(updateMerchantStatusPayload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('merchants')
      },
    }
  )
}
