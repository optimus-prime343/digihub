import { Divider, Menu } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { useRouter } from 'next/router'
import { BiMessageAlt } from 'react-icons/bi'
import { VscReport } from 'react-icons/vsc'

import { ReportMerchantForm } from '@/features/merchant'
import { useUser } from '@/hooks/auth'
import { IMerchant } from '@/types/merchant'

export const ProductMerchantInfo = ({ merchant }: { merchant: IMerchant }) => {
  const { user } = useUser()
  const modals = useModals()
  const router = useRouter()

  const handleReport = () => {
    modals.openModal({
      title: `Report ${merchant.businessName}`,
      children: user ? (
        <ReportMerchantForm
          onReportSuccess={() => modals.closeAll()}
          reportedBusiness={merchant.businessName}
          reportedBy={user.email}
        />
      ) : null,
    })
  }
  return (
    <div className='max-w-sm rounded-md bg-gray-600 p-4'>
      <div className='flex justify-between'>
        <h3 className='heading-tertiary'>{merchant.businessName}</h3>
        <Menu>
          <Menu.Item
            icon={<BiMessageAlt />}
            onClick={() =>
              router.push({
                pathname: '/chat-test',
                query: { receiverId: merchant.id },
              })
            }
          >
            Message
          </Menu.Item>
          <Menu.Item color='red' icon={<VscReport />} onClick={handleReport}>
            Report
          </Menu.Item>
        </Menu>
      </div>
      <Divider my='sm' />
      <p className='mt-2 leading-relaxed'>{merchant.businessDescription}</p>
    </div>
  )
}
