import React from 'react'

import { Layout, WithAuth } from '@/components/core'
import { MerchantOrders } from '@/components/merchant'
import { useUser } from '@/hooks/auth'
import { UserRole } from '@/types/user'

const OrdersPage = () => {
  const { user } = useUser()
  return (
    <Layout title={`Digihub | ${user?.merchant?.businessName} Orders`}>
      <MerchantOrders />
    </Layout>
  )
}

export default WithAuth(OrdersPage, {
  restrictTo: UserRole.MERCHANT,
})
