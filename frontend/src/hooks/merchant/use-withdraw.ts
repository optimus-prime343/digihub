import { useMutation, useQueryClient } from 'react-query'

import { merchantService } from '@/services/merchant-service'

export const useWithDraw = () => {
  const queryClient = useQueryClient()
  return useMutation<unknown, unknown, number>(
    amount => merchantService.withdraw(amount),
    { onSuccess: () => queryClient.invalidateQueries('user') }
  )
}
