import { useRouter } from 'next/router'

import { Layout } from '@/components/core'
import { MerchantSignupForm, UserSignupForm } from '@/features/auth'

const Signup = () => {
  const router = useRouter()
  const userType = router.query.as as string
  return (
    <Layout title={`Digihub | Signup as ${userType}`}>
      <div className='mx-auto max-w-xl py-6'>
        {userType === 'merchant' ? <MerchantSignupForm /> : <UserSignupForm />}{' '}
      </div>
    </Layout>
  )
}

export default Signup
