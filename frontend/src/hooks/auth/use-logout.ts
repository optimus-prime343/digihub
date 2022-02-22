import { useCallback } from 'react'
import { useQueryClient } from 'react-query'

import { autoLogout } from '@/utils/auth'

export const useLogout = () => {
  const queryClient = useQueryClient()
  return useCallback(async () => {
    autoLogout()
    queryClient.removeQueries('user')
  }, [queryClient])
}
