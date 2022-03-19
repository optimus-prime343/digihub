import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { HiLogout } from 'react-icons/hi'
import { toast } from 'react-toastify'

import { sidebarLinks } from '../data/sidebar-links'
import { useLogout } from '../hooks/use-logout'

interface Props {
  children: ReactNode
}
export const Sidebar = ({ children }: Props) => {
  const router = useRouter()

  const logout = useLogout()
  const sidebarLink = (pathname: string) =>
    classNames('px-4 py-3 text-lg rounded-md transition-colors duration-500', {
      'bg-indigo-600 font-bold shadow-lg': router.pathname === pathname,
      'hover:bg-gray-800': router.pathname !== pathname,
    })
  const handleLogout = () => {
    logout()
    router.push('/')
    toast.success('Logout successful')
  }
  return (
    <>
      <div className='fixed top-0 left-0 flex h-full w-72 flex-col bg-gray-800/75 p-4 shadow-sm'>
        <Image
          src='/images/logo.png'
          width={400}
          height={150}
          alt='Digihub brand logo'
          objectFit='cover'
        />
        <span className='my-6 block h-px w-full bg-gray-700' />
        <nav className='flex flex-col space-y-4'>
          {sidebarLinks.map(link => (
            <Link href={link.href} key={link.name}>
              <a className={sidebarLink(link.href)}>{link.name}</a>
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className='mt-auto inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-3 text-white'
        >
          <HiLogout />
          <span>Logout</span>
        </button>
      </div>
      <aside className='ml-72 p-4 py-4'>{children}</aside>
    </>
  )
}
