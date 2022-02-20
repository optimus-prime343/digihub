import '@/styles/globals.css'
import '@/styles/nprogress.css'

import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { done, start } from 'nprogress'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

import { ClientOnly } from '@/components/core'
import { Navbar } from '@/components/ui'
import { AuthProvider } from '@/context/auth'
import { MerchantProvider } from '@/context/merchant'
import OrderProvider from '@/context/order/order-provider'
import { ProductProvider } from '@/context/product'
import { UserProvider } from '@/context/user'
import { theme } from '@/utils/theme'

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    router.events.on('routeChangeStart', start)
    router.events.on('routeChangeComplete', done)
    router.events.on('routeChangeError', done)
  }, [router.events])
  return (
    <ClientOnly>
      <AuthProvider>
        <UserProvider>
          <MerchantProvider>
            <ProductProvider>
              <OrderProvider>
                <MantineProvider theme={theme}>
                  <Navbar />
                  <Toaster />
                  <Component {...pageProps} />
                </MantineProvider>
              </OrderProvider>
            </ProductProvider>
          </MerchantProvider>
        </UserProvider>
      </AuthProvider>
    </ClientOnly>
  )
}
