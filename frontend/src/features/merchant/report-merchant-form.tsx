import { Button, Textarea, TextInput } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import { randTextRange } from '@ngneat/falso'
import { FormEvent, useState } from 'react'
import { useMutation } from 'react-query'

import { merchantService } from '@/services/merchant-service'
import { ReportMerchantPayload } from '@/types/merchant'

interface Props {
  reportedBusiness: string
  reportedBy: string
  onReportSuccess: () => void
}
export const ReportMerchantForm = ({
  reportedBusiness,
  reportedBy,
  onReportSuccess,
}: Props) => {
  const { showNotification } = useNotifications()

  const [title, setTitle] = useState(randTextRange({ min: 30, max: 60 }))
  const [text, setText] = useState(randTextRange({ min: 50, max: 300 }))
  const { mutateAsync, isLoading } = useMutation<
    string,
    Error,
    ReportMerchantPayload
  >(reportMerchantPayload =>
    merchantService.reportMerchant(reportMerchantPayload)
  )

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newReport: ReportMerchantPayload = {
      reportedBusiness,
      reportedBy,
      text,
      title,
    }
    try {
      const message = await mutateAsync(newReport)
      showNotification({ message })
      onReportSuccess()
    } catch (error: any) {
      showNotification({ message: error.message, color: 'red' })
    }
  }
  return (
    <form className='space-y-2' onSubmit={handleSubmit}>
      <TextInput
        label='Title'
        onChange={event => setTitle(event.currentTarget.value)}
        placeholder='Report title'
        value={title}
      />
      <Textarea
        label='Content'
        minRows={6}
        onChange={event => setText(event.currentTarget.value)}
        placeholder='Brief description of your report'
        value={text}
      />
      <Button loading={isLoading} type='submit'>
        Submit report
      </Button>
    </form>
  )
}
