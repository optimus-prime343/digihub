import '@/styles/globals.css'
import '@/styles/nprogress.css'
import 'react-toastify/dist/ReactToastify.min.css'
import '@stripe/stripe-js'

import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { done, start } from 'nprogress'
import { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from 'react-toastify'

import { ClientOnly } from '@/components/core'
import { FullPageError, Navbar } from '@/components/ui'
import { theme } from '@/utils/theme'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    router.events.on('routeChangeStart', start)
    router.events.on('routeChangeComplete', done)
    router.events.on('routeChangeError', done)
  }, [router.events])
  return (
    <ErrorBoundary FallbackComponent={FullPageError}>
      <QueryClientProvider client={queryClient}>
        <ClientOnly>
          <ReactQueryDevtools />
          <MantineProvider
            emotionOptions={{ key: 'mantine', prepend: false }}
            theme={theme}
          >
            <ModalsProvider>
              <NotificationsProvider>
                <ToastContainer
                  autoClose={5000}
                  position='bottom-right'
                  theme='dark'
                />
                <Hydrate state={pageProps.dehydratedState}>
                  <Navbar />
                  <Component {...pageProps} />
                </Hydrate>
              </NotificationsProvider>
            </ModalsProvider>
          </MantineProvider>
        </ClientOnly>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
