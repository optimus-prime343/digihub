import { Layout } from '@/components/core'
import MerchantProductsPreview from '@/components/product/MerchantProductsPreview'

const MerchantHome = () => {
  return (
    <Layout title='Digihub | Merchant Overview'>
      <MerchantProductsPreview />
    </Layout>
  )
}
export default MerchantHome
