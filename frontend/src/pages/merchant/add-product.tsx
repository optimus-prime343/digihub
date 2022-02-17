import AddProduct from '~merchant/add-product'
import Layout from '~shared/layout'
import PrivateRoute from '~shared/private-route'
import RestrictPageAccess from '~shared/restrict-page-access'
import { UserRole } from '~types/user'

const AddProductPage = () => {
  return (
    <PrivateRoute>
      <RestrictPageAccess restrictTo={UserRole.MERCHANT}>
        <Layout title='Digihub | Add Product'>
          <AddProduct />
        </Layout>
      </RestrictPageAccess>
    </PrivateRoute>
  )
}

export default AddProductPage
