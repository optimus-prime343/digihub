import { Layout, WithAuth } from '@/components/core'
import MerchantOverview from '@/components/merchant/MerchantOverview'
import { useUser } from '@/hooks/auth'
import { UserRole } from '@/types/user'

const Dashboard = () => {
  const { user } = useUser()
  return (
    <Layout title={`Digihub | ${user?.merchant?.businessName} Dashboard`}>
      <MerchantOverview />
    </Layout>
  )
}

export default WithAuth(Dashboard, {
  restrictTo: UserRole.MERCHANT,
})
