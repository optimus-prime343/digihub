import { IUser } from '../../typings/user'
import { UserItem } from './user-item'

interface Props {
  users: IUser[]
}
export const UserList = ({ users }: Props) => {
  return (
    <div className='space-y-4'>
      {users.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  )
}
