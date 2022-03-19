import { useQuery } from 'react-query'

import { IUser } from '../typings/user'
import { axiosClient } from '../utils/axios-client'

export const useUsers = () => {
  return useQuery<IUser[], Error>('users', async () => {
    try {
      const { data } = await axiosClient.get<IUser[]>('/admin/users')
      return data ?? []
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Error fetching users')
    }
  })
}
