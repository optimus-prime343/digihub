import Image from 'next/image'

import { Layout } from '@/components/core'
import { LoginForm } from '@/features/auth'

const Login = () => {
  return (
    <Layout title='Digihub | Login to your account'>
      <div className='mx-auto my-4 flex max-w-4xl flex-col items-start rounded-md p-4 lg:my-12 lg:flex-row lg:bg-gray-600 lg:p-8'>
        <Image alt='Login' height={400} src='/images/login.svg' width={500} />
        <LoginForm />
      </div>
    </Layout>
  )
}

export default Login
