import '@/styles/globals.css'
import '@/styles/nprogress.css'
import 'react-toastify/dist/ReactToastify.min.css'

import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { done, start } from 'nprogress'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from 'react-toastify'

import { ClientOnly } from '@/components/core'
import { Navbar } from '@/components/ui'
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
    <QueryClientProvider client={queryClient}>
      <ClientOnly>
        <ReactQueryDevtools />
        <MantineProvider theme={theme}>
          <Navbar />
          <ToastContainer autoClose={5000} theme='dark' />
          <Component {...pageProps} />
        </MantineProvider>
      </ClientOnly>
    </QueryClientProvider>
  )
}
