import { GetServerSideProps } from 'next'

import { Layout } from '@/components/core'
import { MerchantHome } from '@/components/merchant'
import { FullPageLoader, Landing } from '@/components/ui'
import { UserHomepageContent } from '@/features/user'
import { useUser } from '@/hooks/auth'
import { UserRole } from '@/types/user'
import { axiosClient } from '@/utils/axios-client'

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
export const getServerSideProps: GetServerSideProps = async () => {
  const { data: totalProducts } = await axiosClient.get<number>(
    '/products/count'
  )
  return {
    props: {
      totalProducts: totalProducts,
    },
  }
}
