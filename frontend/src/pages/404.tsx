import { Button } from '@mantine/core'
import { useRouter } from 'next/router'
import React from 'react'

const NotFoundPage = () => {
  const router = useRouter()
  return (
    <div className='flex min-h-[calc(100vh-6rem)] items-center justify-center'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <h1 className='text-8xl font-bold'>404</h1>
        <p className='text-lg text-red-400'>
          The page you are looking for does not exist
        </p>
        <Button className='bg-indigo-600' onClick={() => router.replace('/')}>
          Return Home
        </Button>
      </div>
    </div>
  )
}

export default NotFoundPage
