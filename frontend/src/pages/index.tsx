import { Layout } from '@/components/core'
import { MerchantHome } from '@/components/merchant'
import { FullPageLoader, Landing } from '@/components/ui'
import { UserHome } from '@/components/user'
import { useAuth } from '@/context/auth'
import { UserRole } from '@/types/user'

// ! replace with swr
export default function Home() {
  const { user, loading } = useAuth()
  if (loading) return <FullPageLoader />
  if (user && user.role === UserRole.MERCHANT) return <MerchantHome />
  if (user && user.role === UserRole.USER) return <UserHome />
  return (
    <Layout>
      <Landing />
    </Layout>
  )
}
