import { useMutation } from 'react-query'

import { authService } from '@/services/auth-service'
import { ResetPasswordPayload } from '@/types/auth'

interface UseResetPassword {
  payload: ResetPasswordPayload
  token: string
}
export const useResetPassword = () => {
  return useMutation<unknown, Error, UseResetPassword>(({ payload, token }) =>
    authService.resetPassword(token, payload)
  )
}
