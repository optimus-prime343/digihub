import { useAuth } from '~context/auth'
import Profile from '~merchant/profile'
import Layout from '~shared/layout'
import PrivateRoute from '~shared/private-route'
import RestrictPageAccess from '~shared/restrict-page-access'
import { UserRole } from '~types/user'

const ProfilePage = () => {
  const { user } = useAuth()
  return (
    <Layout title={`Digihub | ${user?.merchant?.businessName} Profile`}>
      <PrivateRoute next='/merchant/profile'>
        <RestrictPageAccess restrictTo={UserRole.MERCHANT}>
          <Profile />
        </RestrictPageAccess>
      </PrivateRoute>
    </Layout>
  )
}

export default ProfilePage
