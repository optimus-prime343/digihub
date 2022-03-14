import { ILoginPayload, IUser } from '~/typings/user'
import { axiosClient } from '~/utils/axios-client'

export const login = async (loginPayload: ILoginPayload): Promise<string> => {
	try {
		const { data } = await axiosClient.post<{ accessToken: string }>(
			'/auth/login',
			loginPayload
		)
		return data.accessToken
	} catch (error: any) {
		throw new Error(error.response?.data?.message ?? 'Failed to login')
	}
}
export const getMe = async () => {
	try {
		const { data } = await axiosClient.get<IUser>('/users/me')
		return data
	} catch (error: any) {
		throw new Error(error.response?.data?.message ?? 'Failed to user info')
	}
}
