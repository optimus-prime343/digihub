import axios from 'axios'
import Cookies from 'js-cookie'

const createAxiosClient = () => {
	const axiosClient = axios.create({
		baseURL: 'http://localhost:4000/api/v1',
		withCredentials: true,
	})
	const adminAuthToken = Cookies.get('adminAuthToken')
	if (adminAuthToken) {
		axiosClient.defaults.headers.common['Authorization'] = `Bearer ${adminAuthToken}`
	}
	return axiosClient
}
export const axiosClient = createAxiosClient()
