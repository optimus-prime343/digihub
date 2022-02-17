import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

import { authService } from '~services/auth-service'
import { ResetPasswordPayload } from '~types/auth'
import { ChangePasswordPayload, IUser, LoginPayload } from '~types/user'

import { authContext, IAuthContext } from './auth-context'

export const AuthProvider: FC = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState<IUser>()
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    //if there is active sessions when component is first mounted
    //fetch the user from the server based on the session token
    //If there is an error,it means there is no session
    setLoading(true)
    ;(async () => {
      try {
        const user = await authService.fetchUser()
        setUser(user)
      } catch {
        setError(undefined)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  useEffect(() => {
    // on route change set error to undefined, so error is not shared between pages
    setError(undefined)
  }, [router.pathname])

  const login = async (loginPayload: LoginPayload, onLogin: () => void) => {
    setLoading(true)
    try {
      await authService.login(loginPayload)
      // once login is successful, fetch the user based on the httponly cookie stored in the browser
      const user = await authService.fetchUser()
      console.log(user)
      setUser(user)
      onLogin()
    } catch (error: any) {
      setError(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }
  const signup = async (signupPayload: unknown, onSignup: () => void) => {
    setLoading(true)
    try {
      await authService.signup(signupPayload)
      onSignup()
    } catch (error: any) {
      setError(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }
  const logout = async (onLogout?: () => void) => {
    try {
      await authService.logout()
      setUser(undefined)
      onLogout?.()
    } catch (error: any) {
      setError(error.response.data.message)
    }
  }
  const resetPassword = async (
    resetToken: string,
    resetPayload: ResetPasswordPayload,
    onSuccess: () => void
  ) => {
    setLoading(true)
    try {
      await authService.resetPassword(resetToken, resetPayload)
      onSuccess()
    } catch (error: any) {
      setError(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }
  const changePassword = async (
    changePasswordPayload: ChangePasswordPayload,
    onSuccess?: () => void
  ) => {
    try {
      await authService.changePassword(changePasswordPayload)
      onSuccess?.()
    } catch (error: any) {
      setError(error.response.data?.message ?? 'Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  const value: IAuthContext = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    resetPassword,
    changePassword,
    setUser,
  }
  return <authContext.Provider value={value}>{children}</authContext.Provider>
}
