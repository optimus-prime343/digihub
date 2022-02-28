import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { GoPackage } from 'react-icons/go'
import { IoMdAddCircle } from 'react-icons/io'
import { VscPreview } from 'react-icons/vsc'

import { NextLink } from '@/components/core'

const MerchantSidebar: FC = ({ children }) => {
  const router = useRouter()
  const dashboardLink = (pathname: string) =>
    classNames(
      'inline-flex items-center w-full rounded-md px-4 py-3 text-lg font-medium transition-all duration-300 hover:bg-indigo-600',
      {
        'bg-indigo-600 shadow-2xl': router.pathname === pathname,
      }
    )
  return (
    <div className='grid grid-cols-1 items-start gap-6 p-4 lg:grid-cols-6 lg:px-8 lg:py-6'>
      <ul className='space-y-2 rounded-2xl bg-gray-600 p-4 shadow-lg lg:sticky lg:top-24 lg:col-start-1 lg:col-end-2'>
        {merchantRoutes.map(({ name, path, icon }) => (
          <li key={name}>
            <NextLink className={dashboardLink(path)} href={path}>
              {icon}
              <span className='ml-4 text-white'>{name}</span>
            </NextLink>
          </li>
        ))}
      </ul>
      <aside className='lg:col-start-2 lg:col-end-7'>{children}</aside>
    </div>
  )
}
const merchantRoutes = [
  {
    name: 'Overview',
    path: '/merchant/dashboard',
    icon: <VscPreview size={30} />,
  },
  {
    name: 'Profile',
    path: '/merchant/profile',
    icon: <CgProfile size={30} />,
  },
  {
    name: 'Products',
    path: '/merchant/products',
    icon: <GoPackage size={30} />,
  },
  {
    name: 'Orders',
    path: '/merchant/orders',
    icon: <AiOutlineShoppingCart size={30} />,
  },
  {
    name: 'Add Product',
    path: '/merchant/add-product',
    icon: <IoMdAddCircle size={30} />,
  },
]

export default MerchantSidebar
