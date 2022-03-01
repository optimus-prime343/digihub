import axios from 'axios'
import { parseCookies } from 'nookies'

const createAxiosClient = () => {
  const axiosClient = axios.create({
    baseURL: 'http://localhost:4000/api/v1',
    withCredentials: true,
  })
  const { token } = parseCookies(null)
  if (token) {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  return axiosClient
}
export const axiosClient = createAxiosClient()
