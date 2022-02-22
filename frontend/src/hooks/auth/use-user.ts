import { parseCookies } from 'nookies'
import { useQuery } from 'react-query'

import { authService } from '@/services/auth-service'
import { IUser } from '@/types/user'

export const useUser = () => {
  const { token } = parseCookies(null)
  const { data, error, isLoading } = useQuery<IUser, Error>(
    'user',
    authService.fetchUser,
    // only fetch user if token is present as a cookie
    { enabled: Boolean(token) }
  )
  return {
    user: data,
    error,
    isLoading,
  }
}
