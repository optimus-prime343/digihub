import { useCallback } from 'react'

import { authService } from '@/services/auth-service'
import { ResetPasswordPayload } from '@/types/auth'

export const useResetPassword = () => {
  return useCallback(
    async (resetToken: string, resetPasswordPayload: ResetPasswordPayload) => {
      await authService.resetPassword(resetToken, resetPasswordPayload)
    },
    []
  )
}
