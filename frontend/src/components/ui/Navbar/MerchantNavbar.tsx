import React, { FC } from 'react'

import { NextLink } from '@/components/core'

interface IMerchantNavbarProperties {
  navButton: (pathname: string) => string
}

const MerchantNavbar: FC<IMerchantNavbarProperties> = ({ navButton }) => {
  return (
    <>
      {navLinks.map(({ href, name }) => (
        <li className={navButton(href)} key={href}>
          <NextLink href={href}>{name}</NextLink>
        </li>
      ))}
    </>
  )
}
const navLinks = [
  {
    href: '/',
    name: 'Home',
  },
  {
    href: '/merchant/dashboard',
    name: 'Dashboard',
  },
]

export default MerchantNavbar
