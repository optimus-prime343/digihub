import classNames from 'classnames'
import { AiOutlinePhone } from 'react-icons/ai'
import { MdGpsFixed } from 'react-icons/md'

import { IMerchant, MerchantStatus } from '../../typings/merchant'

interface Props {
  merchant: IMerchant
}
const MerchantInfo = ({ merchant }: Props) => {
  const iconText = classNames(
    'bg-gray-100 p-2 rounded-sm flex items-center gap-2 font-medium'
  )
  const merchantStatus = (status: MerchantStatus) =>
    classNames('inline-block px-2 py-1 rounded-md font-medium', {
      'text-green-600 bg-green-100': status === MerchantStatus.APPROVED,
      'text-red-600 bg-red-100':
        status === (MerchantStatus.REJECTED || MerchantStatus.BLOCKED),
      'text-gray-600 bg-gray-100': status === MerchantStatus.PENDING,
    })
  return (
    <div className='space-y-2'>
      <div>
        <p className={merchantStatus(merchant.status)}>{merchant.status}</p>
      </div>
      <h3 className='heading'>{merchant.businessName}</h3>
      <p>{merchant.businessDescription}</p>
      <p className={iconText}>
        <MdGpsFixed />
        {merchant.address}
      </p>
      <p className={iconText}>
        <AiOutlinePhone />
        {merchant.phoneNumber}
      </p>
      <div className='rounded-sm bg-green-50 p-2 font-medium text-green-600'>
        <p>Net Income: Rs {merchant.netIncome}</p>
      </div>
    </div>
  )
}

export default MerchantInfo
