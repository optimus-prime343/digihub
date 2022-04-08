import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'

import { theme } from '@/utils/theme'

interface Props {
  children: ReactNode
}
export const Providers = ({ children }: Props) => {
  const [client] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={client}>
      <MantineProvider
        emotionOptions={{ key: 'mantine', prepend: false }}
        theme={theme}
      >
        <NotificationsProvider>
          <ModalsProvider>
            <ToastContainer position='bottom-right' theme='dark' />
            {children}
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}
