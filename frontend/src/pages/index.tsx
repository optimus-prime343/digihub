import { Layout } from '@/components/core'
import { MerchantHome } from '@/components/merchant'
import { FullPageLoader, Landing } from '@/components/ui'
import { UserHome } from '@/components/user'
import { useUser } from '@/hooks/auth'
import { UserRole } from '@/types/user'

export default function Home() {
  const { user, isLoading } = useUser()
  if (isLoading) return <FullPageLoader />
  if (user && user.role === UserRole.MERCHANT) return <MerchantHome />
  if (user && user.role === UserRole.USER) return <UserHome />
  return (
    <Layout>
      <Landing />
    </Layout>
  )
}
