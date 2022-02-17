import React from 'react'
import { useAuth } from 'src/context/auth'

import Orders from '~merchant/order-list'
import Layout from '~shared/layout'
import PrivateRoute from '~shared/private-route'
import RestrictPageAccess from '~shared/restrict-page-access'
import { UserRole } from '~types/user'

const OrdersPage = () => {
  const { user } = useAuth()
  return (
    <Layout title={`Digihub | ${user?.merchant?.businessName} Orders`}>
      <PrivateRoute>
        <RestrictPageAccess restrictTo={UserRole.MERCHANT}>
          <Orders />
        </RestrictPageAccess>
      </PrivateRoute>
    </Layout>
  )
}

export default OrdersPage
