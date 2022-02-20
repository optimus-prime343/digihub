import { useRouter } from 'next/router'

import { MerchantSignupForm, UserSignupForm } from '@/components/auth'
import { Layout, NextLink } from '@/components/core'

const Signup = () => {
  const router = useRouter()
  const userType = router.query.as as string
  return (
    <Layout title={`Digihub | Signup as ${userType}`}>
      <div className='mx-auto max-w-xl py-6'>
        {userType === 'merchant' ? <MerchantSignupForm /> : <UserSignupForm />}{' '}
        <p className='text-center'>
          Already have an account ? {''}
          <NextLink className='link' href='/auth/login'>
            Login
          </NextLink>
        </p>
      </div>
    </Layout>
  )
}

export default Signup
