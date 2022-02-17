/* eslint-disable @next/next/no-img-element */
import classnames from 'classnames'
import { Sling as Hamburger } from 'hamburger-react'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

import { useAuth } from '~context/auth'
import MerchantNavbar from '~layouts/Navbar/components/MerchantNavbar'
import UserNavbar from '~layouts/Navbar/components/UserNavbar'
import NextLink from '~shared/next-link'
import { UserRole } from '~types/user'

import InitialNavbar from './components/InitialNavbar'

const navLinkList = (showNav: boolean) =>
  classnames(
    `flex gap-2 p-4 absolute top-24 rounded-md left-0 w-full flex-col transition-all duration-700 md:static md:w-auto md:bg-transparent md:flex-row md:p-0`,
    {
      'translate-y-0 opacity-100 visible bg-gray-900 z-10': showNav,
      'translate-y-6 opacity-0 invisible md:translate-y-0 md:opacity-100 md:visible':
        !showNav,
    }
  )

const DefaultNavbar = () => {
  const router = useRouter()
  const { user } = useAuth()
  const navbarReference = useRef<HTMLUListElement | null>(null)
  const [showNav, setShowNav] = useState(false)

  const isActive = (pathname: string) => router.asPath === pathname

  // automatically hide the navbar on mobile viewport when user clicks outside of it
  const handleClickOutside = () => setShowNav(false)

  // style navbar item based on the active pathname
  const navButton = (pathname: string) =>
    classnames(
      `px-4 py-2 text-lg rounded-md cursor-pointer hover:bg-indigo-600 transition-all duration-500 `,
      { 'bg-indigo-600 shadow-lg': isActive(pathname) }
    )

  useOnClickOutside(navbarReference, handleClickOutside)
  useEffect(() => {
    //close the navmenu if user is navigating to a different page
    const handleRouteChange = () => setShowNav(false)
    router.events.on('routeChangeStart', handleRouteChange)
    //cleanup function
    return () => router.events.off('routeChangeStart', handleRouteChange)
  }, [router])
  // render the navbar based on the user role
  const RenderNavbar = () => {
    switch (user?.role) {
      case UserRole.USER:
        return <UserNavbar />
      case UserRole.MERCHANT:
        return <MerchantNavbar navButton={navButton} />
      default:
        return <InitialNavbar navButton={navButton} />
    }
  }
  return (
    <header className='sticky top-0 z-10 bg-gray-900/30 px-4 py-3 backdrop-blur-md lg:px-8'>
      <nav
        className='relative flex items-center justify-between'
        ref={navbarReference}
      >
        <NextLink href={user ? `/${user.role.toLowerCase()}` : '/'}>
          <img
            alt='Digihub brand logo'
            className='h-16'
            src='/images/logo.png'
          />
        </NextLink>
        <ul className={navLinkList(showNav)}>
          <RenderNavbar />
        </ul>
        <div className='block md:hidden'>
          <Hamburger onToggle={setShowNav} toggled={showNav} />
        </div>
      </nav>
    </header>
  )
}

export default DefaultNavbar
