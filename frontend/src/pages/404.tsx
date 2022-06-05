import { Button, Text, Title } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NotFoundPage = () => {
  return (
    <div className='flex items-center justify-center p-4 lg:min-h-[calc(100vh-6rem)] lg:p-0'>
      <div className='grid max-w-4xl items-center lg:grid-cols-2 lg:gap-24'>
        <div className='space-y-2'>
          <Title>Something not right</Title>
          <Text>
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Link href='/' passHref>
            <Button color='indigo' component='a' variant='outline'>
              Go to home page
            </Button>
          </Link>
        </div>
        <Image
          alt='Page not found'
          height={400}
          src='/images/404_not_found.svg'
          width={400}
        />
      </div>
    </div>
  )
}

export default NotFoundPage
