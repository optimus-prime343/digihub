import { Button, Table } from '@mantine/core'

import { Sidebar } from '../components/sidebar'
import { useUsers } from '../hooks/use-users'

const UsersListPage = () => {
  const { data = [] } = useUsers()
  const rows = data.map(user => (
    <tr key={user.id}>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.username}</td>
      <td>{JSON.stringify(user.verified)}</td>
      <td>
        <Button>Delete</Button>
      </td>
    </tr>
  ))
  return (
    <Sidebar>
      <Table striped>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Address</th>
            <th>Username</th>
            <th>Verified</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Sidebar>
  )
}

export default UsersListPage
