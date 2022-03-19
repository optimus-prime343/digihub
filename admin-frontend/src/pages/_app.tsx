import '../styles/tailwind.css'
import 'react-toastify/dist/ReactToastify.css'

import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from 'react-toastify'

import { PrivateRoute } from '../components/private-route'

const client = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools />
      <ToastContainer theme='colored' position='bottom-right' />
      <MantineProvider
        withGlobalStyles
        theme={{ colorScheme: 'dark', primaryColor: 'violet' }}
        emotionOptions={{ key: 'mantine', prepend: false }}
      >
        <NotificationsProvider>
          <Hydrate state={pageProps.dehydratedState}>
            <PrivateRoute>
              <Component {...pageProps} />
            </PrivateRoute>
          </Hydrate>
        </NotificationsProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default MyApp
