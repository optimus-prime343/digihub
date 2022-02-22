import { Layout, WithAuth } from '@/components/core'
import { MerchantProducts } from '@/components/merchant'
import { useUser } from '@/hooks/auth'
import { UserRole } from '@/types/user'

const ProductsPage = () => {
  const { user } = useUser()
  return (
    <Layout title={`Digihub | ${user?.merchant?.businessName} Products`}>
      <MerchantProducts />
    </Layout>
  )
}

export default WithAuth(ProductsPage, {
  restrictTo: UserRole.MERCHANT,
})
