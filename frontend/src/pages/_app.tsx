import '@/styles/globals.css'
import '@/styles/nprogress.css'
import 'react-toastify/dist/ReactToastify.min.css'
import '@stripe/stripe-js'

import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { done, start } from 'nprogress'
import { useEffect } from 'react'
import { Hydrate } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { Providers } from '@/components/core'
import { Navbar } from '@/components/ui'

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    router.events.on('routeChangeStart', start)
    router.events.on('routeChangeComplete', done)
    router.events.on('routeChangeError', done)
  }, [router.events])
  return (
    <Providers>
      <ReactQueryDevtools />
      <Hydrate state={pageProps.dehydratedState}>
        <Navbar />
        <Component {...pageProps} />
      </Hydrate>
    </Providers>
  )
}
