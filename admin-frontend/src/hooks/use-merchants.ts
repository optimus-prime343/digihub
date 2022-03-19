import { useQuery } from 'react-query'

import { getAllMerchants } from '../services/merchant-service'
import { IMerchant } from '../typings/merchant'

export const useMerchants = () => {
  return useQuery<IMerchant[], Error>(['merchants'], getAllMerchants, {
    initialData: [],
  })
}
