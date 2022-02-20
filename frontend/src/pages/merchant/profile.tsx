import { Layout, WithAuth } from '@/components/core'
import MerchantProfile from '@/components/merchant/MerchantProfile'
import { useAuth } from '@/context/auth'
import { UserRole } from '@/types/user'

const ProfilePage = () => {
  const { user } = useAuth()
  return (
    <Layout title={`Digihub | ${user?.merchant?.businessName} Profile`}>
      <MerchantProfile />
    </Layout>
  )
}

export default WithAuth(ProfilePage, {
  restrictTo: UserRole.MERCHANT,
  next: '/merchant/profile',
})
