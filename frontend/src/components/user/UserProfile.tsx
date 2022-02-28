import { ChangePasswordForm } from '@/features/auth'

import UserProfileForm from './UserProfileForm'

const UserProfile = () => {
  return (
    <div className='max-w-3xl space-y-4'>
      <UserProfileForm />
      <ChangePasswordForm />
    </div>
  )
}

export default UserProfile
