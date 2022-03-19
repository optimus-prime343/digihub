import { useCallback } from 'react'
import { useQueryClient } from 'react-query'

import { login } from '../services/auth-service'
import { LoginPayload } from '../typings/user'
import { autoLogin } from '../utils/auth'

export const useLogin = () => {
  const queryClient = useQueryClient()
  return useCallback(
    async (loginPayload: LoginPayload) => {
      const accessToken = await login(loginPayload)
      autoLogin(accessToken)
      queryClient.invalidateQueries('user')
    },
    [queryClient]
  )
}
