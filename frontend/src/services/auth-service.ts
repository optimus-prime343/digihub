import { ResetPasswordPayload } from '~types/auth'
import {
  ChangePasswordPayload,
  IUser,
  LoginPayload,
  UpdateUserPayload,
} from '~types/user'
import { axiosClient } from '~utils/axiosClient'

class AuthService {
  async login(loginPayload: LoginPayload) {
    const { data } = await axiosClient.post<{ accessToken: string }>(
      '/auth/login',
      loginPayload
    )
    return data
  }
  async signup<T>(signupPayload: T) {
    const { data } = await axiosClient.post<string>(
      '/auth/signup',
      signupPayload
    )
    return data
  }
  async logout() {
    const { data } = await axiosClient.get<string>('/auth/logout')
    return data
  }
  async fetchUser() {
    const { data } = await axiosClient.get<IUser>('/users/me')
    return data
  }
  async resetPassword(resetToken: string, resetPayload: ResetPasswordPayload) {
    const { data } = await axiosClient.patch<string>(
      `/auth/reset-password/${resetToken}`,
      resetPayload
    )
    return data
  }
  async changePassword(changePasswordPayload: ChangePasswordPayload) {
    const { data } = await axiosClient.patch<string>(
      '/auth/change-password',
      changePasswordPayload
    )
    return data
  }
  async updateUser(updateUserPayload: UpdateUserPayload) {
    const { data } = await axiosClient.patch<IUser | undefined>(
      '/users',
      updateUserPayload
    )
    return data
  }
}
export const authService = new AuthService()
