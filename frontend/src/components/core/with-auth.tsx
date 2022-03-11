import { Alert } from '@mantine/core'
import { useRouter } from 'next/router'
import { ComponentType, useEffect } from 'react'

import { FullPageLoader } from '@/components/ui'
import { useUser } from '@/hooks/auth'
import { UserRole } from '@/types/user'

interface WithAuthOptions {
  restrictTo?: UserRole
}
const WithAuth = (Component: ComponentType, options?: WithAuthOptions) => {
  const WrapperComponent = () => {
    const router = useRouter()
    const { user, isLoading, error } = useUser()
    useEffect(() => {
      if (!user && !isLoading && !error) {
        router.push(`/auth/login`)
      }
    }, [user, error, router, isLoading])
    // if restrictTo is provided in options, then check if the logged in user role matches the restrictTo
    // if not, show an alert saying route doesn't exist
    if (options?.restrictTo && user && user.role !== options.restrictTo) {
      return (
        <div className='mx-auto max-w-lg rounded-md bg-red-500'>
          <Alert color='yellow' title="Page doesn't exist" variant='filled'>
            {router.pathname} doesn&apos;t exist{' '}
          </Alert>
        </div>
      )
    }
    if (user) return <Component />
    return <FullPageLoader />
  }
  return WrapperComponent
}
export default WithAuth
