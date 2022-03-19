import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { dehydrate, DehydratedState, QueryClient } from 'react-query'

import { Sidebar } from '../components/sidebar'
import { IUser } from '../typings/user'
import { axiosClient } from '../utils/axios-client'

const AdminHomePage = () => {
  return (
    <Sidebar>
      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, est? Ipsam
        ipsum inventore incidunt repellendus, adipisci ad esse iure illo praesentium
        sed nobis aut blanditiis temporibus suscipit dolor magni. Sapiente.
      </h1>
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
