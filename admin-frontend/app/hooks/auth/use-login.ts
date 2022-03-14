import { useCallback } from 'react'
import { useQueryClient } from 'react-query'

import { login } from '~/services/auth-service'
import { ILoginPayload } from '~/typings/user'
import { autoLogin } from '~/utils/auth'

export const useLogin = () => {
	const queryClient = useQueryClient()
	return useCallback(
		async (loginPayload: ILoginPayload) => {
			const token = await login(loginPayload)
			autoLogin(token)
			queryClient.invalidateQueries('user')
		},
		[queryClient]
	)
}
