import axios from 'axios'
import nookies from 'nookies'

const createAxiosClient = () => {
  const { adminAuthToken } = nookies.get(null)
  const client = axios.create({
    baseURL: 'http://localhost:4000/api/v1',
    withCredentials: true,
  })
  if (adminAuthToken)
    client.defaults.headers.common['Authorization'] = `Bearer ${adminAuthToken}`
  return client
}
export const axiosClient = createAxiosClient()
