import { useAuth } from '~context/auth'
import ChangePasswordForm from '~forms/change-password-form'
import MerchantProfileForm from '~forms/merchant-profile-form'
import UpdateUserProfileForm from '~forms/user-profile-form'
import { IUser } from '~types/user'

import Sidebar from './sidebar'

const Profile = () => {
  const { user } = useAuth()
  return (
    <Sidebar>
      <div className='space-y-4 lg:max-w-4xl'>
        <UpdateUserProfileForm />
        <MerchantProfileForm user={user as IUser} />
        <ChangePasswordForm />
      </div>
    </Sidebar>
  )
}

export default Profile
