import { useCallback } from 'react'
import { useQueryClient } from 'react-query'

import { authService } from '@/services/auth-service'
import { LoginPayload } from '@/types/user'
import { autoLogin } from '@/utils/auth'

export const useLogin = () => {
  const queryClient = useQueryClient()
  return useCallback(
    async (loginPayload: LoginPayload) => {
      const { accessToken } = await authService.login(loginPayload)
      autoLogin(accessToken)
      queryClient.invalidateQueries('user')
    },
    [queryClient]
  )
}
