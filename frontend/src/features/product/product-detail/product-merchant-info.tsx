import { Divider, Menu } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { BiMessageAlt } from 'react-icons/bi'
import { VscReport } from 'react-icons/vsc'

import { MessageList } from '@/features/chat'
import { ReportMerchantForm } from '@/features/merchant'
import { useUser } from '@/hooks/auth'
import { IMerchant } from '@/types/merchant'

export const ProductMerchantInfo = ({ merchant }: { merchant: IMerchant }) => {
  const { user } = useUser()
  const modals = useModals()

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
  const openChatModal = (recipient: string) => {
    modals.openModal({
      title: 'Chat',
      children: <MessageList recipient={recipient} />,
    })
  }
  return (
    <div className='max-w-sm rounded-md bg-gray-600 p-4'>
      <div className='flex justify-between'>
        <h3 className='heading-tertiary'>{merchant.businessName}</h3>
        <Menu>
          <Menu.Item
            icon={<BiMessageAlt />}
            onClick={() => openChatModal(merchant.id)}
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
