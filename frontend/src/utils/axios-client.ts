import axios from 'axios'
import { parseCookies } from 'nookies'

export const createAxiosClient = <T>(context?: T) => {
  const axiosClient = axios.create({
    baseURL: 'http://localhost:4000/api/v1',
    withCredentials: true,
  })
  const { token } = parseCookies(context)
  if (token) {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  return axiosClient
}
export const axiosClient = createAxiosClient()
