import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient, useQuery } from 'react-query'

import { ProductList } from '../../components/product'
import { Sidebar } from '../../components/sidebar'
import { getProducts } from '../../services/product-service'
import { IProduct } from '../../typings/product'

interface Props {
  initialProducts: IProduct[]
}
const ProductListPage = ({ initialProducts }: Props) => {
  const { data: products } = useQuery<IProduct[]>('products', getProducts, {
    initialData: initialProducts,
  })
  return (
    <Sidebar>
      <ProductList products={products ?? []} />
    </Sidebar>
  )
}
export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient()
  queryClient.prefetchQuery('products', getProducts)
  return { props: { dehydratedState: dehydrate(queryClient) } }
}
export default ProductListPage
