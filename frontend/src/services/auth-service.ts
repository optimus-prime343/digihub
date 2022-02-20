import { ResetPasswordPayload } from '@/types/auth'
import {
  ChangePasswordPayload,
  IUser,
  LoginPayload,
  UpdateUserPayload,
} from '@/types/user'
import { axiosClient } from '@/utils/axiosClient'

class AuthService {
  async login(loginPayload: LoginPayload) {
    try {
      const { data } = await axiosClient.post<{ accessToken: string }>(
        '/auth/login',
        loginPayload
      )
      return data
    } catch (error: any) {
      throw new Error(error.response.data.message)
    }
  }
  async signup<T>(signupPayload: T) {
    try {
      const { data } = await axiosClient.post<string>(
        '/auth/signup',
        signupPayload
      )
      return data
    } catch (error: any) {
      throw new Error(error.response.data.message)
    }
  }
  async logout() {
    const { data } = await axiosClient.get<string>('/auth/logout')
    return data
  }
  async fetchUser() {
    try {
      const { data } = await axiosClient.get<IUser>('/users/me')
      return data
    } catch (error: any) {
      throw new Error(error.response.data.message)
    }
  }
  async resetPassword(resetToken: string, resetPayload: ResetPasswordPayload) {
    try {
      const { data } = await axiosClient.patch<string>(
        `/auth/reset-password/${resetToken}`,
        resetPayload
      )
      return data
    } catch (error: any) {
      throw new Error(error.response.data.message)
    }
  }
  async changePassword(changePasswordPayload: ChangePasswordPayload) {
    try {
      const { data } = await axiosClient.patch<string>(
        '/auth/change-password',
        changePasswordPayload
      )
      return data
    } catch (error: any) {
      throw new Error(error.response.data.message)
    }
  }
  async updateUser(updateUserPayload: UpdateUserPayload) {
    try {
      const { data } = await axiosClient.patch<IUser | undefined>(
        '/users',
        updateUserPayload
      )
      return data
    } catch (error: any) {
      throw new Error(error.response.data.message)
    }
  }
}
export const authService = new AuthService()
