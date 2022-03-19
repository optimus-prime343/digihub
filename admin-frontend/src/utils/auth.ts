import { destroyCookie, setCookie } from 'nookies'

import { axiosClient } from './axios-client'

export const deleteAuthToken = () => {
  axiosClient.defaults.headers.common['Authorization'] = ''
  delete axiosClient.defaults.headers.common['Authorization']
}
export const setAuthToken = (token: string) => {
  deleteAuthToken()
  axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
export const autoLogin = (token: string) => {
  setCookie(null, 'adminAuthToken', token)
  setAuthToken(token)
}
export const autoLogout = () => {
  destroyCookie(null, 'adminAuthToken')
  deleteAuthToken()
}
