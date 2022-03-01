import { IUser, UpdateUserPayload } from '@/types/user'
import { axiosClient } from '@/utils/axios-client'

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
  async updateProfileImage(formData: FormData) {
    try {
      const { data: message } = await axiosClient.patch<string>(
        '/users/upload-profile-image',
        formData
      )
      return message
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ?? 'Failed to update user image'
      )
    }
  }
}
export const userService = new UserService()
