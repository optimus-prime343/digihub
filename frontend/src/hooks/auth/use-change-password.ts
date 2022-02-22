import { useCallback } from 'react'

import { authService } from '@/services/auth-service'
import { ChangePasswordPayload } from '@/types/user'

export const useChangePassword = () => {
  return useCallback(async (changePasswordPayload: ChangePasswordPayload) => {
    await authService.changePassword(changePasswordPayload)
  }, [])
}
