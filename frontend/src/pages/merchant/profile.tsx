import { Layout, WithAuth } from '@/components/core'
import MerchantProfile from '@/components/merchant/MerchantProfile'
import { useUser } from '@/hooks/auth'
import { UserRole } from '@/types/user'

const ProfilePage = () => {
  const { user } = useUser()
  return (
    <Layout title={`Digihub | ${user?.merchant?.businessName} Profile`}>
      <MerchantProfile />
    </Layout>
  )
}

export default WithAuth(ProfilePage, {
  restrictTo: UserRole.MERCHANT,
})
