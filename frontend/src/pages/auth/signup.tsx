import { useRouter } from 'next/router'

import SignupMerchantForm from '~forms/signup-merchant-form'
import SignupUserForm from '~forms/signup-user-form'
import Layout from '~shared/layout'
import NextLink from '~shared/next-link'

const Signup = () => {
  const router = useRouter()
  const userType = router.query.as as string
  return (
    <Layout title={`Digihub | Signup as ${userType}`}>
      <div className='mx-auto max-w-xl py-6'>
        {userType === 'merchant' ? <SignupMerchantForm /> : <SignupUserForm />}{' '}
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
