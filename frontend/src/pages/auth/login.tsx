import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useAuth } from '~context/auth'
import LoginForm from '~forms/login-form'
import Layout from '~shared/layout'

const Login = () => {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If already logged in rediect user to their respective page based on their role
    if (user) router.push(`/${user.role.toLowerCase()}`)
  }, [user, router])
  return (
    <Layout title='Digihub | Login to your account'>
      <LoginForm />
    </Layout>
  )
}

export default Login
