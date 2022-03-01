import { destroyCookie, setCookie } from 'nookies'

import { axiosClient } from '@/utils/axios-client'

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
  setCookie(null, 'token', token)
  setAuthToken(token)
}
export const autoLogout = () => {
  destroyCookie(null, 'token')
  deleteAuthToken()
}
