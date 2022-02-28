import { useMutation, useQueryClient } from 'react-query'

import { userService } from '@/services/user-service'

export const useUpdateProfileImage = () => {
  const queryClient = useQueryClient()
  return useMutation<string, Error, FormData>(
    updateImagePayload => userService.updateProfileImage(updateImagePayload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user')
      },
    }
  )
}
