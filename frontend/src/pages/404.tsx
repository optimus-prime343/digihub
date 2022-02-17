import { Button } from '@mantine/core'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

import { useAuth } from '~context/auth'

const NotFoundPage = () => {
  const router = useRouter()
  const { user } = useAuth()
  const handleClick = () => {
    router.push(user ? user.role.toLowerCase() : '/')
  }
  return (
    <div className='p-4 lg:p-0'>
      <div className='mx-auto my-4 flex max-w-4xl flex-col items-center gap-4 rounded-md bg-white p-4 text-black backdrop-blur-sm lg:my-12'>
        <h2 className=' text-4xl font-bold text-red-600 lg:text-6xl'>
          404 NOT FOUND
        </h2>
        <p className='text-lg font-medium'>{`${router.asPath} doesn't exist`}</p>
        <Button className='bg-indigo-600' onClick={handleClick}>
          Return To Homepage
        </Button>
        <Image
          alt='Page not found'
          height={350}
          src='/images/404_not_found.svg'
          width={350}
        />
      </div>
    </div>
  )
}

export default NotFoundPage
