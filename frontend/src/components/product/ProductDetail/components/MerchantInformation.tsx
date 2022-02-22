import { Button } from '@mantine/core'
import { BiPhoneCall } from 'react-icons/bi'
import { BsChatLeft } from 'react-icons/bs'
import { GoLocation } from 'react-icons/go'

import { IMerchant } from '@/types/merchant'

interface Props {
  merchant: IMerchant
}

const MerchantInformation = ({ merchant }: Props) => {
  return (
    <div className='mt-4 max-w-lg rounded-md bg-gray-800 p-4'>
      <div className='flex items-center justify-between'>
        <h4>
          Sold by <span className='font-bold'>{merchant.businessName}</span>
        </h4>
        <Button className='bg-indigo-600' leftIcon={<BsChatLeft />}>
          Chat Now
        </Button>
      </div>
      <span className='my-4 block h-px w-full bg-gray-700/75' />
      <div className='space-y-2'>
        <p className='leading-relaxed'>{merchant.businessDescription}</p>
        <p className='flex items-center gap-2'>
          <span>
            <GoLocation />
          </span>
          <span>{merchant.address}</span>
        </p>
        <p className='flex items-center gap-2'>
          <span>
            <BiPhoneCall />
          </span>
          <span>{merchant.phoneNumber}</span>
        </p>
      </div>
    </div>
  )
}

export default MerchantInformation
