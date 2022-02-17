import classNames from 'classnames'
import React from 'react'
import { AiOutlineClockCircle, AiOutlinePieChart } from 'react-icons/ai'
import { BsWallet } from 'react-icons/bs'

import { useAuth } from '~context/auth'
import WithdrawAmountPrompt from '~merchant/withdraw-amount-prompt'

const icon = (label: string) =>
  classNames('p-2 rounded-md shadow-md', {
    'bg-green-600': label === 'netIncome',
    'bg-blue-600': label === 'withDrawn',
    'bg-pink-600': label === 'pending',
  })

const EarningOverview = () => {
  const { user } = useAuth()
  const { netIncome, pendingAmount, withdrawAmount } = {
    netIncome: user?.merchant?.netIncome ?? 0,
    pendingAmount: user?.merchant?.pendingAmount ?? 0,
    withdrawAmount: user?.merchant?.withDrawAmount ?? 0,
  }
  return (
    <div className='mt-6'>
      <h3 className='heading-tertiary mb-4'>Earnings</h3>
      <div className='flex flex-col gap-6 lg:flex-row'>
        <OverviewContainer
          icon={<BsWallet className={icon('netIncome')} size={50} />}
          label='Net Income'
          value={`$${netIncome}`}
        />
        <OverviewContainer
          icon={<AiOutlinePieChart className={icon('withDrawn')} size={50} />}
          label='Withdrawn'
          value={`$${withdrawAmount}`}
        />
        <OverviewContainer
          icon={<AiOutlineClockCircle className={icon('pending')} size={50} />}
          label='Pending'
          value={`$${pendingAmount}`}
        />
      </div>
      {pendingAmount > 5 && <WithdrawAmountPrompt />}
    </div>
  )
}
const OverviewContainer = ({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon: React.ReactNode
}) => {
  // const icon
  return (
    <div className='flex gap-6 rounded-2xl bg-gray-800 px-4 py-6 shadow-md'>
      {icon}
      <div className='space-y-2'>
        <h4 className='text-2xl uppercase'>{label}</h4>
        <p className='text-lg'>{value}</p>
      </div>
    </div>
  )
}

export default EarningOverview
