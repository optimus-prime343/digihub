import { parseCookies } from 'nookies'
import { useQuery } from 'react-query'

import { getUser } from '../services/auth-service'
import { IUser } from '../typings/user'

export const useUser = () => {
  const { adminAuthToken } = parseCookies(null)
  return useQuery<IUser, Error>('user', getUser, {
    // only make request to fetch current user if only there is token stored in the cookies
    enabled: Boolean(adminAuthToken),
  })
}
