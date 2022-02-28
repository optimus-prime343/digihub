import { useMutation } from 'react-query'

import { authService } from '@/services/auth-service'
import { ChangePasswordPayload } from '@/types/user'

export const useChangePassword = () => {
  return useMutation<unknown, Error, ChangePasswordPayload>(
    changePasswordPayload => authService.changePassword(changePasswordPayload)
  )
}
