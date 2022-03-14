import Cookies from 'js-cookie'

import { axiosClient } from './axios-client'

export const deleteAuthToken = () => {
	axiosClient.defaults.headers.common['Authorization'] = ''
	delete axiosClient.defaults.headers.common['Authorization']
}

export const setAuthToken = (token: string) => {
	deleteAuthToken()
	if (token) {
		axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
	}
}
export const autoLogin = (token: string) => {
	Cookies.set('adminAuthToken', token)
	setAuthToken(token)
}
export const autoLogout = () => {
	Cookies.remove('adminAuthToken')
	deleteAuthToken()
}
