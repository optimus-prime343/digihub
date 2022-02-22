import { useMutation, useQueryClient } from 'react-query'

import { userService } from '@/services/user-service'
import { UpdateUserPayload } from '@/types/user'

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation<unknown, unknown, UpdateUserPayload>(
    data => userService.updateUser(data),
    { onSettled: () => queryClient.invalidateQueries('user') }
  )
}
