import { useAuth } from '~context/auth'
import MerchantOverview from '~merchant/merchant-overview'
import Layout from '~shared/layout'
import PrivateRoute from '~shared/private-route'
import RestrictPageAccess from '~shared/restrict-page-access'
import { UserRole } from '~types/user'

const Dashboard = () => {
  const { user } = useAuth()
  return (
    <Layout title={`Digihub | ${user?.merchant?.businessName} Dashboard`}>
      <PrivateRoute next='/merchant/dashboard'>
        <RestrictPageAccess restrictTo={UserRole.MERCHANT}>
          <MerchantOverview />
        </RestrictPageAccess>
      </PrivateRoute>
    </Layout>
  )
}

export default Dashboard
