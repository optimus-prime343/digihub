/* eslint-disable @next/next/no-img-element */
import { useClickOutside } from '@mantine/hooks'
import classnames from 'classnames'
import { Sling as Hamburger } from 'hamburger-react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { NextLink } from '@/components/core'
import { navLinks } from '@/constants/nav-links'
import { useUser } from '@/hooks/auth'
import { UserRole } from '@/types/user'

const navLinkList = (showNav: boolean) =>
  classnames(
    `flex gap-2 p-4 absolute top-20 rounded-md left-0 w-full flex-col transition-all duration-700 md:static md:w-auto md:bg-transparent md:flex-row md:p-0`,
    {
      'translate-y-0 opacity-100 visible bg-gray-600 z-10': showNav,
      'translate-y-6 opacity-0 invisible md:translate-y-0 md:opacity-100 md:visible':
        !showNav,
    }
  )

const DefaultNavbar = () => {
  const router = useRouter()
  const { user } = useUser()
  const [showNav, setShowNav] = useState(false)
  const navbarRef = useClickOutside(() => setShowNav(false))
  const navbarLinks = !user
    ? navLinks.regular
    : user.role === UserRole.MERCHANT
    ? navLinks.merchant
    : navLinks.user

  const navLink = (pathname: string) =>
    classnames(
      `block px-4 py-2 text-lg rounded-md cursor-pointer hover:bg-indigo-600 transition-all duration-500 lg:inline-block`,
      { 'bg-indigo-600 shadow-lg': router.asPath === pathname }
    )
  useEffect(() => {
    //close the navmenu if user is navigating to a different page
    const handleRouteChange = () => setShowNav(false)
    router.events.on('routeChangeStart', handleRouteChange)
    //cleanup function
    return () => router.events.off('routeChangeStart', handleRouteChange)
  }, [router])
  return (
    <header className='sticky top-0 z-10 bg-gray-600/50 px-4 py-3 shadow-sm backdrop-blur-md lg:px-8'>
      <nav
        className='relative flex items-center justify-between'
        ref={navbarRef}
      >
        <NextLink href='/'>
          <img
            alt='Digihub brand logo'
            className='h-16'
            src='/images/logo.png'
          />
        </NextLink>
        <ul className={navLinkList(showNav)}>
          {navbarLinks.map(({ href, name }) => (
            <li key={href}>
              <NextLink className={navLink(href)} href={href}>
                {name}
              </NextLink>
            </li>
          ))}
        </ul>
        <div className='md:hidden'>
          <Hamburger onToggle={setShowNav} toggled={showNav} />
        </div>
      </nav>
    </header>
  )
}

export default DefaultNavbar
