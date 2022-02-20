import Head from 'next/head'
import React, { ReactNode } from 'react'

interface Props {
  title?: string
  children: ReactNode
}
const Layout = ({ title, children }: Props) => {
  return (
    <>
      <Head>
        <title>
          {title ?? 'Digihub | Buy and Sell Digital Products Online'}
        </title>
        <meta key='title' property='og:title' title={title} />
      </Head>
      <main className='mb-6 min-h-screen'>{children}</main>
    </>
  )
}

export default Layout
