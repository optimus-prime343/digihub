import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

import { useAuth } from '@/context/auth'
import { userService } from '@/services/user-service'
import { UpdateUserPayload } from '@/types/user'

import { IUserContext, userContext } from './user-context'

export const UserProvider: FC = ({ children }) => {
  const router = useRouter()
  const { setUser } = useAuth()
  const [error, setError] = useState<string | undefined>()

  useEffect(() => {
    // Reset error on route change
    setError(undefined)
  }, [router.pathname])
  const updateUser = async (
    updateUserPayload: UpdateUserPayload,
    onUpdate?: () => void
  ) => {
    try {
      const user = await userService.updateUser(updateUserPayload)
      if (user) {
        setUser(user)
        setError(undefined)
        onUpdate?.()
      }
    } catch (error: any) {
      setError(error.response.data?.message ?? 'Failed to update user')
    }
  }

  const value: IUserContext = {
    updateUser,
    error,
  }
  return <userContext.Provider value={value}>{children}</userContext.Provider>
}
