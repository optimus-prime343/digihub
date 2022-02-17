import MerchantProductsPreview from '~product/merchant-products-preview'
import Layout from '~shared/layout'
import PrivateRoute from '~shared/private-route'
import RestrictPageAccess from '~shared/restrict-page-access'
import { UserRole } from '~types/user'

const MerchantHomePage = () => {
  return (
    <Layout title='Digihub | Merchant Overview'>
      <PrivateRoute next='merchant'>
        <RestrictPageAccess restrictTo={UserRole.MERCHANT}>
          <div>
            <MerchantProductsPreview />
          </div>
        </RestrictPageAccess>
      </PrivateRoute>
    </Layout>
  )
}

export default MerchantHomePage
