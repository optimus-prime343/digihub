import { GetStaticPaths, GetStaticProps } from 'next'

import { Layout } from '@/components/core'
import { ProductDetail } from '@/features/product'
import { productService } from '@/services/product-service'
import { IProduct } from '@/types/product'

interface Props {
  product?: IProduct
  error?: string
}
const ProductDetailPage = ({ product, error }: Props) => {
  if (!product) return <p>Product Not found</p>
  if (error) return <p>{error}</p>
  return (
    <Layout title={`Digihub | ${product.name}`}>
      <ProductDetail product={product} />
    </Layout>
  )
}
export const getStaticProps: GetStaticProps = async context => {
  try {
    const { id } = context.params as { id: string }
    const product = await productService.getProduct(id)
    return {
      props: {
        product,
      },
      revalidate: 200,
    }
  } catch (error: any) {
    return {
      props: {
        product: null,
        error: error.message,
      },
    }
  }
}
export const getStaticPaths: GetStaticPaths = async () => {
  const products = await productService.fetchProducts()
  const paths = products.map(product => ({
    params: {
      id: product.id,
    },
  }))
  return { paths, fallback: 'blocking' }
}
export default ProductDetailPage
