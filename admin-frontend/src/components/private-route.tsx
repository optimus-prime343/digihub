import { ReactNode } from 'react'

import { useUser } from '../hooks/use-user'
import { UserRole } from '../typings/user'
import { LoginForm } from './login-form'

interface Props {
  children: ReactNode
}
export const PrivateRoute = ({ children }: Props) => {
  const { data: user, isLoading, error } = useUser()
  if (!user && !isLoading && !error) return <LoginForm />
  if (user && user.role !== UserRole.ADMIN)
    return <p>You are not authorized to view this page</p>
  if (user) return <>{children}</>
  return <p>Loading.....</p>
}
