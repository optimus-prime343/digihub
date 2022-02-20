import { createContext, useContext } from 'react'

import { UpdateUserPayload } from '@/types/user'

export interface IUserContext {
  updateUser: (
    updateUserPayload: UpdateUserPayload,
    onUpdate?: () => void
  ) => Promise<void>
  error?: string
}
export const userContext = createContext<IUserContext>({} as IUserContext)
export const useUser = () => useContext(userContext)
