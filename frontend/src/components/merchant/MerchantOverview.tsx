import EarningOverview from '@/components/merchant/EarningOverview'
import MerchantOrdersOverview from '@/components/merchant/MerchantOrdersOverview'
import { MerchantSidebar } from '@/components/ui'
import { useUser } from '@/hooks/auth'
import { getGreetingTime } from '@/utils/get-greeting-time'

const MerchantOverview = () => {
  const { user } = useUser()
  return (
    <MerchantSidebar>
      <h4 className='heading-tertiary mb-2'>
        {getGreetingTime()}, {`Mr ${user?.lastName}`}
      </h4>
      <p className='mb-6 max-w-xl text-lg font-medium text-gray-400'>
        Here are your sales overview
      </p>
      <MerchantOrdersOverview />
      <EarningOverview />
    </MerchantSidebar>
  )
}

export default MerchantOverview
