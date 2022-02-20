import { Layout, WithAuth } from '@/components/core'
import { MerchantProducts } from '@/components/merchant'
import { useAuth } from '@/context/auth'
import { UserRole } from '@/types/user'

const ProductsPage = () => {
  const { user } = useAuth()
  return (
    <Layout title={`Digihub | ${user?.merchant?.businessName} Products`}>
      <MerchantProducts />
    </Layout>
  )
}

export default WithAuth(ProductsPage, { restrictTo: UserRole.MERCHANT })
