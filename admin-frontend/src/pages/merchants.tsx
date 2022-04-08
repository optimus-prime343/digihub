import { Table } from '@mantine/core'
import { useEffect, useState } from 'react'

import { SearchMerchantsForm, UpdateMerchantStatus } from '../components/merchant'
import { Sidebar } from '../components/sidebar'
import { useMerchants } from '../hooks/use-merchants'

const MerchantListPage = () => {
  const { data = [] } = useMerchants()
  const [filteredMerchants, setFilteredMerchants] = useState(data)

  const rows = filteredMerchants.map(merchant => (
    <tr key={merchant.id}>
      <td>{merchant.user.firstName}</td>
      <td>{merchant.user.lastName}</td>
      <td>{merchant.user.email}</td>
      <td>{merchant.user.username}</td>
      <td>{merchant.businessName}</td>
      <td>{merchant.address}</td>
      <td>{merchant.phoneNumber}</td>
      <td>
        <UpdateMerchantStatus id={merchant.id} initialStatus={merchant.status} />
      </td>
      <td>{merchant.netIncome}</td>
    </tr>
  ))
  return (
    <Sidebar>
      <SearchMerchantsForm
        merchants={data}
        onSearchComplete={merchants => setFilteredMerchants(merchants)}
      />
      <Table striped>
        <thead>
          <tr>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Email Address</td>
            <td>Username</td>
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
