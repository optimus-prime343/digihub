import { useQuery } from 'react-query'

import { fetchMerchants } from '~/services/merchant-service'
import { IMerchant } from '~/typings/merchant'

export const useMerchants = () => {
	return useQuery<IMerchant[]>(['merchants'], fetchMerchants)
}
