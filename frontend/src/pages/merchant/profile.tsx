import { Layout, WithAuth } from '@/components/core'
import { MerchantSidebar } from '@/components/ui'
import { Profile } from '@/features/user'
import { useUser } from '@/hooks/auth'
import { UserRole } from '@/types/user'

const ProfilePage = () => {
  const { user } = useUser()
  return (
    <Layout title={`Digihub | ${user?.merchant?.businessName} Profile`}>
      <MerchantSidebar>
        <Profile />
      </MerchantSidebar>
    </Layout>
  )
}

export default WithAuth(ProfilePage, {
  restrictTo: UserRole.MERCHANT,
})
