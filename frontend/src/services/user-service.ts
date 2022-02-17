import { IUser, UpdateUserPayload } from '~types/user'
import { axiosClient } from '~utils/axiosClient'

class UserService {
  async updateUser(updateUserPayload: UpdateUserPayload) {
    const { data } = await axiosClient.patch<IUser | undefined>(
      '/users',
      updateUserPayload
    )
    return data
  }
}
export const userService = new UserService()
