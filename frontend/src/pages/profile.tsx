import { Tabs } from '@mantine/core'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BiMessageAlt, BiPurchaseTag } from 'react-icons/bi'
import { BsCart } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'

import { WithAuth } from '@/components/core'
import { OrderList } from '@/components/order'
import { CartList } from '@/features/cart'
import { ContactList } from '@/features/chat'
import { Profile } from '@/features/user'
import { useCarts } from '@/hooks/cart'
import { useUserOrders } from '@/hooks/order'
import { UserRole } from '@/types/user'

const TABS = ['cart', 'orders', 'messages', 'account']

const ProfilePage = () => {
  const router = useRouter()
  const { data: orders } = useUserOrders()
  const { data: cartItems } = useCarts()
  // set the active tab based on the route hash
  const [activeTab, setActiveTab] = useState(() =>
    TABS.indexOf(window.location.hash.substring(1))
  )
  const handleTabChange = (tab: number) => {
    // on tab change, update the hash in the url
    // this sets the active tab based on the hash in the url
    router.push(`/profile#${TABS[tab]}`)
    setActiveTab(tab)
  }
  return (
    <div className='p-4 lg:px-8 lg:py-4'>
      <Tabs active={activeTab} onTabChange={handleTabChange} variant='default'>
        <Tabs.Tab icon={<BsCart />} label='Cart'>
          <CartList cartItems={cartItems} />
        </Tabs.Tab>
        <Tabs.Tab icon={<BiPurchaseTag />} label='Orders'>
          <OrderList orders={orders ?? []} />
        </Tabs.Tab>
        <Tabs.Tab icon={<BiMessageAlt />} label='Messages'>
          <ContactList />
        </Tabs.Tab>
        <Tabs.Tab icon={<CgProfile />} label='Account'>
          <Profile />
        </Tabs.Tab>
      </Tabs>
    </div>
  )
}
export default WithAuth(ProfilePage, {
  restrictTo: UserRole.USER,
})
