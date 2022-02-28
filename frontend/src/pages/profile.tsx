import { Tabs } from '@mantine/core'

import { WithAuth } from '@/components/core'
import { OrderList } from '@/components/order'
import { UserProfile } from '@/components/user'
import { CartList } from '@/features/cart'
import { useCarts } from '@/hooks/cart'
import { useUserOrders } from '@/hooks/order'
import { UserRole } from '@/types/user'

const Profile = () => {
  const { data: orders } = useUserOrders()
  const { data: cartItems } = useCarts()
  // this enables us to use hash based routing within the tabs
  // if there is any hash in the current url then set that as the active tab
  return (
    <div className='p-4 lg:px-8 lg:py-4'>
      <Tabs variant='default'>
        <Tabs.Tab label='Cart'>
          <CartList cartItems={cartItems} />
        </Tabs.Tab>
        <Tabs.Tab label='Orders'>
          <OrderList orders={orders ?? []} />
        </Tabs.Tab>
        <Tabs.Tab label='Messages'>Messages</Tabs.Tab>
        <Tabs.Tab label='Profile'>
          <UserProfile />
        </Tabs.Tab>
      </Tabs>
    </div>
  )
}

export default WithAuth(Profile, {
  restrictTo: UserRole.USER,
})
