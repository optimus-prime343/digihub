/* eslint-disable @next/next/no-img-element */
import { Burger, Button } from '@mantine/core'
import { useClickOutside } from '@mantine/hooks'
import classnames from 'classnames'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Headroom from 'react-headroom'

import { NextLink } from '@/components/core'
import { navLinks } from '@/constants/nav-links'
import { useUser } from '@/hooks/auth'
import { useCarts } from '@/hooks/cart'
import { UserRole } from '@/types/user'

const navLinkList = (showNav: boolean) =>
  classnames(
    `flex items-center gap-2 p-4 absolute top-20 rounded-md left-0 w-full flex-col transition-all duration-700 md:static md:w-auto md:bg-transparent md:flex-row md:p-0`,
    {
      'translate-y-0 opacity-100 visible bg-gray-600 z-10 shadow-2xl': showNav,
      'translate-y-6 opacity-0 invisible md:translate-y-0 md:opacity-100 md:visible':
        !showNav,
    }
  )

export const Navbar = () => {
  const router = useRouter()
  const { user } = useUser()
  const { data } = useCarts()
  const [showNav, setShowNav] = useState(false)
  const navbarRef = useClickOutside(() => setShowNav(false))
  // render different navbar links based on user role
  const navbarLinks = !user
    ? navLinks.regular
    : user.role === UserRole.MERCHANT
    ? navLinks.merchant
    : navLinks.user

  useEffect(() => {
    //close the navmenu if user is navigating to a different page
    const handleRouteChange = () => setShowNav(false)
    router.events.on('routeChangeStart', handleRouteChange)
    //cleanup function
    return () => router.events.off('routeChangeStart', handleRouteChange)
  }, [router])
  return (
    <Headroom>
      <header className='sticky top-0 z-10 border-b border-gray-100/10 px-4 py-2 backdrop-blur-md lg:bg-gray-700/75 lg:px-8'>
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
                <Button
                  component={NextLink}
                  href={href}
                  variant={router.asPath === href ? 'filled' : 'default'}
                >
                  {/* if router name matches cart then show the total number of items in the cart in the navbar */}
                  {name === 'Cart' ? (
                    <div className='inline-flex items-center gap-2'>
                      {data.length > 0 && (
                        <span className='inline-flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs text-black'>
                          {data.length}
                        </span>
                      )}
                      <span className='text-sm'>{name}</span>
                    </div>
                  ) : (
                    name
                  )}
                </Button>
              </li>
            ))}
          </ul>
          <div className='md:hidden'>
            {/* <Hamburger onToggle={setShowNav} toggled={showNav} /> */}
            <Burger onClick={() => setShowNav(!showNav)} opened={showNav} />
          </div>
        </nav>
      </header>
    </Headroom>
  )
}
