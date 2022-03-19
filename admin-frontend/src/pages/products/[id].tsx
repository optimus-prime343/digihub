import { GetServerSideProps } from 'next'

import { ProductDetail } from '../../components/product'
import { Sidebar } from '../../components/sidebar'
import { IProduct } from '../../typings/product'
import { axiosClient } from '../../utils/axios-client'

interface Props {
  product?: IProduct
}
const ProductDetailPage = ({ product }: Props) => {
  if (!product) return <p>Product not found</p>
  return (
    <Sidebar>
      <ProductDetail product={product} />
    </Sidebar>
  )
}
export const getServerSideProps: GetServerSideProps = async context => {
  const productId = context.params?.id as string | undefined
  if (!productId) return { props: { product: undefined } }
  const { data } = await axiosClient.get<IProduct>(`/products/${productId}`)
  return { props: { product: data } }
}
export default ProductDetailPage
