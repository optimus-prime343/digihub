import { Tabs } from '@mantine/core'

import { WithAuth } from '@/components/core'
import { OrderList } from '@/components/order'
import { CartList } from '@/features/cart'
import { Profile } from '@/features/user'
import { useCarts } from '@/hooks/cart'
import { useUserOrders } from '@/hooks/order'
import { UserRole } from '@/types/user'

const ProfilePage = () => {
  const { data: orders } = useUserOrders()
  const { data: cartItems } = useCarts()
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
          <Profile />
        </Tabs.Tab>
      </Tabs>
    </div>
  )
}

export default WithAuth(ProfilePage, {
  restrictTo: UserRole.USER,
})
