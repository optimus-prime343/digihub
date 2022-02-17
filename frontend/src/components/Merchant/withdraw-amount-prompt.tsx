import { Alert, Button, Modal, NumberInput } from '@mantine/core'
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'

import { useMerchant } from '~context/merchant'

const WithdrawAmountPrompt = () => {
  const { error, withdrawAmount } = useMerchant()
  const [opened, setOpened] = useState(false)
  const [amount, setAmount] = useState(0)
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await withdrawAmount(amount, () => {
      toast.success(`Successfully withdrew ${amount}`)
      setOpened(false)
    })
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
          {error && (
            <Alert color='red' title='Failed to withdraw' variant='filled'>
              {error}
            </Alert>
          )}
          <NumberInput
            label='Amount'
            min={0}
            onChange={value => setAmount(value ?? 0)}
            value={0}
          />
          <Button className='bg-indigo-600' fullWidth type='submit'>
            Confirm withdrawal
          </Button>
        </form>
      </Modal>
      <Button className='mt-4 bg-indigo-600' onClick={() => setOpened(true)}>
        Withdraw
      </Button>
    </>
  )
}

export default WithdrawAmountPrompt
