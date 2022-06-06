import { Button, Modal, NumberInput } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import React, { FormEvent, useState } from 'react'

import { useWithDraw } from '@/hooks/merchant/use-withdraw'

const WithdrawAmountPrompt = () => {
  const { showNotification } = useNotifications()
  const { mutateAsync } = useWithDraw()
  const [opened, setOpened] = useState(false)
  const [amount, setAmount] = useState(0)
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await mutateAsync(amount)
      setOpened(false)
      showNotification({ message: 'Withdrawl successful' })
    } catch (error: any) {
      showNotification({ message: error.message, color: 'red' })
    }
  }
  return (
    <>
      <Modal
        onClose={() => setOpened(false)}
        opened={opened}
        title='Withdraw your earning'
      >
        <form className='space-y-2' onSubmit={handleSubmit}>
          <h3 className='text-lg font-bold'>
            How much would you like to withdraw?
          </h3>
          <NumberInput
            label='Amount'
            min={0}
            onChange={value => setAmount(value ?? 0)}
            value={0}
          />
          <Button fullWidth type='submit'>
            Confirm withdrawal
          </Button>
        </form>
      </Modal>
      <Button className='mt-4' onClick={() => setOpened(true)}>
        Withdraw
      </Button>
    </>
  )
}

export default WithdrawAmountPrompt
