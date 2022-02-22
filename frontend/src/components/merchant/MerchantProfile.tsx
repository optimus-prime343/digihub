import { ChangePasswordForm } from '@/components/auth'
import UpdateUserProfileForm from '@/components/user/UserProfileForm'
import { useUser } from '@/hooks/auth'
import { IUser } from '@/types/user'

import Sidebar from '../ui/MerchantSidebar'
import BusinessInfoForm from './BusinessInfoForm'

const MerchantProfile = () => {
  const { user } = useUser()
  return (
    <Sidebar>
      <div className='space-y-4 lg:max-w-4xl'>
        <UpdateUserProfileForm />
        <BusinessInfoForm user={user as IUser} />
        <ChangePasswordForm />
      </div>
    </Sidebar>
  )
}

export default MerchantProfile
