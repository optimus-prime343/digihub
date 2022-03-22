import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { useMemo } from 'react'
import { dehydrate, DehydratedState, QueryClient } from 'react-query'

import { Sidebar } from '../components/sidebar'
import { useMerchants } from '../hooks/use-merchants'
import { useOrders } from '../hooks/use-orders'
import { useProducts } from '../hooks/use-products'
import { useUsers } from '../hooks/use-users'
import { IUser } from '../typings/user'
import { axiosClient } from '../utils/axios-client'

const AdminHomePage = () => {
  const users = useUsers()
  const merchants = useMerchants()
  const orders = useOrders()
  const products = useProducts()

  const stats = useMemo(
    () => ({
      'Total Users': users.data?.length ?? 0,
      'Total Merchants': merchants.data?.length ?? 0,
      'Total Products': products.data?.length ?? 0,
      'Total Orders': orders.data?.length ?? 0,
      'Total Transaction': (merchants.data ?? [])
        .map(merchant => merchant.netIncome)
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0),
    }),
    [merchants.data, orders.data?.length, products.data?.length, users.data?.length]
  )
  return (
    <Sidebar>
      <div className='flex flex-wrap gap-4'>
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className='w-56 rounded-md bg-gray-600 p-4 text-center'>
            <h3 className='mb-4 text-6xl font-bold'>{value}</h3>
            <p className='text-lg font-medium'>
              {value === 1 ? key.slice(0, key.length - 1) : key}
            </p>
          </div>
        ))}
      </div>
    </Sidebar>
  )
}
export const getServerSideProps: GetServerSideProps<{
  dehydratedState: DehydratedState | null
}> = async context => {
  const queryClient = new QueryClient()
  const { adminAuthToken } = nookies.get(context)
  if (adminAuthToken) {
    queryClient.prefetchQuery('user', async () => {
      const { data } = await axiosClient.get<IUser>('/users/me', {
        headers: {
          Authorization: `Bearer ${adminAuthToken}`,
        },
      })
      return data
    })
    return { props: { dehydratedState: dehydrate(queryClient) } }
  }
  return { props: { dehydratedState: null } }
}
export default AdminHomePage
