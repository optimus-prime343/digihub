import { Layout, WithAuth } from '@/components/core'
import { AddProductForm } from '@/components/product'
import { UserRole } from '@/types/user'

const AddProductPage = () => {
  return (
    <Layout title='Digihub'>
      <AddProductForm />
    </Layout>
  )
}

export default WithAuth(AddProductPage, {
  restrictTo: UserRole.MERCHANT,
})
