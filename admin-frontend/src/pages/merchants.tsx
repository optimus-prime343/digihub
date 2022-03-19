import { Table } from '@mantine/core'

import { Sidebar } from '../components/sidebar'
import { useMerchants } from '../hooks/use-merchants'

const MerchantListPage = () => {
  const { data = [] } = useMerchants()
  const rows = data.map(merchant => (
    <tr key={merchant.id}>
      <td>{merchant.businessName}</td>
      <td>{merchant.address}</td>
      <td>{merchant.phoneNumber}</td>
      <td>{merchant.status}</td>
      <td>{merchant.netIncome}</td>
    </tr>
  ))
  return (
    <Sidebar>
      <Table striped>
        <thead>
          <tr>
            <td>Business Name</td>
            <td>Address</td>
            <td>Phone Number</td>
            <td>Status</td>
            <td>Net Income</td>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Sidebar>
  )
}

export default MerchantListPage
