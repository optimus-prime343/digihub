import React, { FC } from 'react'

import NextLink from '~shared/next-link'

interface InitialNavbarProperties {
  // function that generates a classname for the navbar item based on the pathname
  navButton: (pathname: string) => string
}

// Navbar which is shown if there is no logged in user
const InitialNavbar: FC<InitialNavbarProperties> = ({ navButton }) => {
  return (
    <>
      {navLinks.map(({ href, text }) => (
        <li className={navButton(href)} key={href}>
          <NextLink href={href}>{text}</NextLink>
        </li>
      ))}
    </>
  )
}
const navLinks = [
  {
    href: '/auth/login',
    text: 'Login',
  },
  {
    href: '/auth/signup?as=user',
    text: 'Signup',
  },
  {
    href: '/auth/signup?as=merchant',
    text: 'Signup as Merchant',
  },
]
export default InitialNavbar
