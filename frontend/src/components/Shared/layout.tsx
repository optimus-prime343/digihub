import Head from 'next/head'
import { FC } from 'react'

export interface LayoutProperties {
  readonly title?: string
}

const Layout: FC<LayoutProperties> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>
          {title ?? 'Digihub | Buy and Sell Digital Products Online'}
        </title>
      </Head>
      {children}
    </>
  )
}
export default Layout
