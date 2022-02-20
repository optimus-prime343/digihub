import { createContext, Dispatch, SetStateAction, useContext } from 'react'

import { ResetPasswordPayload } from '@/types/auth'
import { ChangePasswordPayload, IUser, LoginPayload } from '@/types/user'

export interface IAuthContext {
  user?: IUser
  loading: boolean
  error?: string
  login: (loginPayload: LoginPayload, onLogin: () => void) => void
  signup: (signupPayload: unknown, onSignup: () => void) => void
  logout: (onLogout?: () => void) => void
  resetPassword: (
    resetToken: string,
    resetPayload: ResetPasswordPayload,
    onSuccess: () => void
  ) => void
  changePassword: (
    changePasswordPayload: ChangePasswordPayload,
    onSuccess?: () => void
  ) => Promise<void>
  setUser: Dispatch<SetStateAction<IUser | undefined>>
}

export const authContext = createContext<IAuthContext>({} as IAuthContext)
export const useAuth = () => useContext(authContext)
