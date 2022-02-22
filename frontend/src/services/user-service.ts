import { IUser, UpdateUserPayload } from '@/types/user'
import { axiosClient } from '@/utils/axiosClient'

class UserService {
  async updateUser(updateUserPayload: UpdateUserPayload) {
    try {
      const { data } = await axiosClient.patch<IUser | undefined>(
        '/users',
        updateUserPayload
      )
      return data
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Failed to update user')
    }
  }
}
export const userService = new UserService()
