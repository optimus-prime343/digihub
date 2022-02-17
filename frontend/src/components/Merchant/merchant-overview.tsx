import { useAuth } from '~context/auth'
import EarningOverview from '~merchant/earning-overview'
import OrdersOverview from '~merchant/orders-overview'
import { getGreetingTime } from '~utils/get-greeting-time'

import Sidebar from './sidebar'

const MerchantOverview = () => {
  const { user } = useAuth()
  return (
    <Sidebar>
      <h4 className='heading-tertiary mb-2'>
        {getGreetingTime()}, {`Mr ${user?.lastName}`}
      </h4>
      <p className='mb-6 max-w-xl text-lg font-medium text-gray-400'>
        Here are your sales overview
      </p>
      <OrdersOverview />
      <EarningOverview />
    </Sidebar>
  )
}

export default MerchantOverview
