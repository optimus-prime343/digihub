import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'

import { useAuth } from '~context/auth'
import { UserRole } from '~types/user'

interface RestrictPageAccessProperties {
  restrictTo: UserRole
}
/**
 * @description Only allow access to the page to the user with the provided role
 */
const RestrictPageAccess: FC<RestrictPageAccessProperties> = ({
  restrictTo,
  children,
}) => {
  const router = useRouter()
  const { user } = useAuth()
  useEffect(() => {
    if (user && user.role !== restrictTo) {
      router.push(`/${user.role.toLowerCase()}`)
    }
  })
  return <>{children}</>
}

export default RestrictPageAccess
