import Cookies from 'js-cookie'
import { useQuery } from 'react-query'

import { getMe } from '~/services/auth-service'
import { IUser } from '~/typings/user'

export const useUser = () => {
	console.log('ADMIN AUTH TOKEN', Cookies.get('admin-auth-token'))
	return useQuery<IUser>(['user'], getMe, {
		enabled: Boolean(Cookies.get('adminAuthToken')),
	})
}
