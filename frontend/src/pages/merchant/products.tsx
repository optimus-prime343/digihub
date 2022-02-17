import { useAuth } from '~context/auth'
import Products from '~merchant/product-list'
import Layout from '~shared/layout'
import PrivateRoute from '~shared/private-route'
import RestrictPageAccess from '~shared/restrict-page-access'
import { UserRole } from '~types/user'

const ProductsPage = () => {
  const { user } = useAuth()
  return (
    <Layout title={`Digihub | ${user?.merchant?.businessName} Products`}>
      <PrivateRoute>
        <RestrictPageAccess restrictTo={UserRole.MERCHANT}>
          <Products />
        </RestrictPageAccess>
      </PrivateRoute>
    </Layout>
  )
}

export default ProductsPage
