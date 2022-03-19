import { MdOutlineDelete } from 'react-icons/md'

import { IUser } from '../../typings/user'

interface Props {
  user: IUser
}
export const UserItem = ({ user }: Props) => {
  return (
    <div className='rounded-md bg-gray-800 p-4'>
      <div className='space-y-2'>
        {Object.entries(user).map(([key, value]) => (
          <div key={key} className='rounded-sm bg-gray-700/25 p-2 text-lg'>
            <p>
              <span className='font-medium capitalize'>{key}</span> :{' '}
              {typeof value === 'boolean' ? JSON.stringify(value) : value}
            </p>
          </div>
        ))}
      </div>
      <button className='btn mt-6 inline-flex items-center gap-2 bg-red-600 p-2'>
        <MdOutlineDelete />
        Delete User
      </button>
    </div>
  )
}
