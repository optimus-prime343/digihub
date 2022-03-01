import { ChangePasswordForm } from '@/features/auth'
import { useUser } from '@/hooks/auth'
import { UserRole } from '@/types/user'

import { PersonalInformationForm } from './personal-information-form'
import { UpdateBusinessInfoForm } from './update-business-info-form'

export const Profile = () => {
  const { user } = useUser()
  return (
    <div className='max-w-4xl space-y-4'>
      <PersonalInformationForm />
      {user && user.role === UserRole.MERCHANT ? (
        <UpdateBusinessInfoForm user={user} />
      ) : null}
      <ChangePasswordForm />
    </div>
  )
}
