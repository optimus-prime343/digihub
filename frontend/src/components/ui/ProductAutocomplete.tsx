import { useClickOutside } from '@mantine/hooks'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { NextLink } from '@/components/core'
import { IProduct } from '@/types/product'
import { getProductImageUrl } from '@/utils/getImageUrl'

interface Props {
  products: IProduct[]
  onClickOutside: () => void
  searchQuery: string
}
const ProductAutocomplete = ({
  products,
  searchQuery,
  onClickOutside,
}: Props) => {
  const router = useRouter()
  const ref = useClickOutside(onClickOutside)
  const handleShowAllResults = () => {
    router.push(`/?search=${searchQuery}`)
    onClickOutside()
  }
  useEffect(() => {
    // automatically close the autocomplete menu when the user clicks on any search result
    router.events.on('routeChangeStart', onClickOutside)
    return () => {
      router.events.off('routeChangeStart', onClickOutside)
    }
  })
  return (
    <div
      className='absolute mt-2 w-full space-y-2 rounded-md bg-gray-800 p-2 shadow-lg'
      ref={ref}
    >
      <h4 className='text-lg font-semibold text-gray-400'>
        Found {products.length} {products.length > 1 ? 'results' : 'result'} for{' '}
        <span className='font-bold text-white'>{searchQuery}</span>
      </h4>
      {/* Show only maximum of 5 results.If user wants to see all results, they can use show all results
          button
      */}
      {products.slice(0, 5).map(product => (
        <NextLink
          className='group flex items-start gap-4 rounded-md p-2 transition-all hover:bg-indigo-600'
          href={`/products/${product.id}`}
          key={product.id}
        >
          <Image
            alt={`${product.name}`}
            className='rounded-md'
            height={100}
            objectFit='cover'
            src={getProductImageUrl(product.images[0])}
            width={100}
          />
          <div>
            <p className='text-lg font-medium'>{product.name}</p>
            <p className='max-w-lg text-gray-400 group-hover:text-white'>{`${product.description.slice(
              0,
              100
            )}...`}</p>
          </div>
        </NextLink>
      ))}
      {/* Only show "show all results" button when the number of filtered products is greater the max
          number of results to show 
      */}
      {products.length > 5 && (
        <button className='btn bg-indigo-600' onClick={handleShowAllResults}>
          Show all results
        </button>
      )}
    </div>
  )
}

export default ProductAutocomplete
