import { Table } from '@mantine/core'
import { MetaFunction } from 'remix'

import { UpdateMerchantStatus } from '~/components/update-merchant-status'
import { useMerchants } from '~/hooks/merchant'

export const meta: MetaFunction = () => ({
	title: 'Digihub | Merchants',
})

const MerchantsPage = () => {
	const { data: merchants } = useMerchants()

	const rows = (merchants ?? []).map(({ firstName, lastName, email, merchant }) => (
		<tr key={merchant.id}>
			<td>{firstName}</td>
			<td>{lastName}</td>
			<td>{email}</td>
			<td>{merchant.businessName}</td>
			<td>{merchant.address}</td>
			<td>{merchant.phoneNumber}</td>
			<td>
				<UpdateMerchantStatus
					merchantId={merchant.id}
					initialStatus={merchant.status}
				/>
			</td>
		</tr>
	))
	return (
		<Table striped>
			<thead>
				<tr>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Email Address</th>
					<th>Business Name</th>
					<th>Address</th>
					<th>Phone Number</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>{rows}</tbody>
		</Table>
	)
}

export default MerchantsPage
