import React from 'react'
import { useAuth } from 'src/context/auth'

import { Layout, WithAuth } from '@/components/core'
import { MerchantOrders } from '@/components/merchant'
import { UserRole } from '@/types/user'

const OrdersPage = () => {
  const { user } = useAuth()
  return (
    <Layout title={`Digihub | ${user?.merchant?.businessName} Orders`}>
      <MerchantOrders />
    </Layout>
  )
}

export default WithAuth(OrdersPage, { restrictTo: UserRole.MERCHANT })
