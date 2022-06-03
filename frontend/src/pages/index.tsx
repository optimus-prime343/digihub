import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { dehydrate, QueryClient } from 'react-query'

import { Layout } from '@/components/core'
import { MerchantHome } from '@/components/merchant'
import { FullPageLoader, Landing } from '@/components/ui'
import { UserHomepageContent } from '@/features/user'
import { useUser } from '@/hooks/auth'
import { productService } from '@/services/product-service'
import { UserRole } from '@/types/user'
import { axiosClient, createAxiosClient } from '@/utils/axios-client'

interface Props {
  totalProducts: number
}

export default function Home({ totalProducts }: Props) {
  const { user, isLoading } = useUser()
  if (isLoading) return <FullPageLoader />
  if (user && user.role === UserRole.MERCHANT) return <MerchantHome />
  if (user && user.role === UserRole.USER)
    return <UserHomepageContent totalProducts={totalProducts} />
  return (
    <Layout>
      <Landing />
    </Layout>
  )
}
export const getServerSideProps: GetServerSideProps = async context => {
  nookies.get(context)
  const queryClient = new QueryClient()
  // fetch products on server
  await queryClient.prefetchQuery('products', () =>
    productService.fetchProducts()
  )
  // fetch the user information on the server
  await queryClient.prefetchQuery('user', async () => {
    const axiosClient = createAxiosClient(context)
    const { data } = await axiosClient.get('/users/me')
    return data
  })
  const { data: totalProducts } = await axiosClient.get<number>(
    '/products/count'
  )
  return {
    props: {
      totalProducts: totalProducts,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
