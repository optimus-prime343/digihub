import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'

import { useAuth } from '~context/auth'
import FullPageLoader from '~shared/full-page-loader'

interface PrivateRouteProperties {
  next?: string
}

const PrivateRoute: FC<PrivateRouteProperties> = ({ children, next }) => {
  const router = useRouter()
  const { loading, error, user } = useAuth()
  useEffect(() => {
    if (!loading && !error && !user) {
      router.push({ pathname: '/auth/login', query: { next } })
    }
  }, [error, loading, next, router, user])
  if (!user || loading) return <FullPageLoader />
  return <>{children}</>
}

export default PrivateRoute
