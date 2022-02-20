import { Alert } from '@mantine/core'
import { useRouter } from 'next/router'
import { ComponentType, useEffect } from 'react'

import { FullPageLoader } from '@/components/ui'
import { useAuth } from '@/context/auth'
import { UserRole } from '@/types/user'

interface WithAuthOptions {
  restrictTo?: UserRole
  next?: string
}
const WithAuth = (Component: ComponentType, options?: WithAuthOptions) => {
  const WrapperComponent = () => {
    const router = useRouter()
    const { user, loading, error } = useAuth()
    useEffect(() => {
      if (!user && !loading && !error) {
        // if next is provided in options , then append next in login url as a query
        // so when the user successfully logs in, he/she will be redirected to the page they were
        // trying to access before logging in
        const nextQuery = options?.next ? `?next=${options.next}` : ''
        router.push(`/auth/login${nextQuery}`)
      }
    }, [user, loading, error, router])
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
