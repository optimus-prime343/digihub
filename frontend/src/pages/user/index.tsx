import PrivateRoute from '~shared/private-route'
import RestrictPageAccess from '~shared/restrict-page-access'
import { UserRole } from '~types/user'

const UserHomePage = () => {
  return (
    <PrivateRoute>
      <RestrictPageAccess restrictTo={UserRole.USER}>
        <div>
          <h1>User homepage</h1>
        </div>
      </RestrictPageAccess>
    </PrivateRoute>
  )
}

export default UserHomePage
