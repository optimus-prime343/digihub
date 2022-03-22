import { IUser, LoginPayload } from '../typings/user'
import { axiosClient } from '../utils/axios-client'

export const login = async (loginpayload: LoginPayload): Promise<string> => {
  try {
    const { data } = await axiosClient.post<{ accessToken: string }>(
      '/auth/login',
      loginpayload
    )
    return data.accessToken
  } catch (error: any) {
    throw new Error(error.response?.data?.message ?? 'Login Failed')
  }
}

export const getUser = async (): Promise<IUser> => {
  try {
    const { data } = await axiosClient.get('/users/me')
    return data
  } catch (error: any) {
    throw new Error(error.response?.data?.message ?? 'Failed to get user')
  }
}
export const createAdmin = async (
  formData: Record<string, FormDataEntryValue>
): Promise<string> => {
  try {
    const { data: message } = await axiosClient.post<string>('/admin', formData)
    return message
  } catch (error: any) {
    throw new Error(error.response?.data?.message ?? 'Failed to create admin')
  }
}
