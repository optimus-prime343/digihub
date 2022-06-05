import { Button, Text, TextInput, Transition } from '@mantine/core'
import { useClickOutside } from '@mantine/hooks'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'

import { NextLink } from '@/components/core'
import { useProductsSearch } from '@/hooks/product'
import { IProduct } from '@/types/product'
import { getProductImageUrl } from '@/utils/getImageUrl'

export const SearchProducts = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const searchContainerRef = useClickOutside(() => setSearchQuery(''))
  const { products } = useProductsSearch(searchQuery)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      router.push({ pathname: '/products/search', query: { searchQuery } })
    }
  }
  return (
    <div className='relative max-w-md flex-1' ref={searchContainerRef}>
      <TextInput
        icon={<BsSearch />}
        onChange={event => setSearchQuery(event.currentTarget.value)}
        onKeyDown={handleKeyDown}
        placeholder='Search products'
        value={searchQuery}
      />
      {/* 
        Show autocomplete menu only when there is a searchquery and more than 0 results corresponding to 
        that search result
      */}
      <SearchAutocomplete products={products} searchQuery={searchQuery} />
    </div>
  )
}

const SearchAutocomplete = ({
  searchQuery,
  products,
}: {
  searchQuery: string
  products: IProduct[]
}) => {
  const router = useRouter()
  return (
    <Transition
      duration={200}
      mounted={searchQuery && products.length > 0 ? true : false}
      timingFunction='ease'
      transition='pop-bottom-right'
    >
      {style => (
        <div
          className='absolute z-40 mt-2 w-full space-y-2 rounded-md bg-gray-600 p-2 shadow-2xl'
          style={style}
        >
          <h3 className='heading-tertiary'>
            Found {products.length} {products.length > 1 ? 'results' : 'result'}{' '}
            for <span className='font-bold text-white'>{searchQuery}</span>
          </h3>
          <div className='space-y-2'>
            {products.slice(0, 3).map(product => (
              <NextLink
                className='flex flex-col items-center gap-4 rounded-md p-2 transition-colors duration-500 hover:bg-gray-500 md:flex-row'
                href={`/products/${product.id}`}
                key={product.id}
              >
                <Image
                  alt={product.name}
                  className='rounded-md'
                  height={100}
                  objectFit='cover'
                  src={getProductImageUrl(product.coverImage)}
                  width={100}
                />
                <div className='w-96'>
                  <h3 className='heading-tertiary'>{product.name}</h3>
                  <Text className='text-gray-100'>
                    {product.description.slice(0, 100)}...
                  </Text>
                </div>
              </NextLink>
            ))}
          </div>
          {/* 
          Only show "Show all results" button when there are more than 3 search results since the
          max displayed search result items are 3
          */}
          {products.length > 3 && (
            <Button
              className='bg-indigo-600'
              onClick={() => {
                router.push({
                  pathname: '/products/search',
                  query: {
                    searchQuery,
                  },
                })
              }}
            >
              Show all results
            </Button>
          )}
        </div>
      )}
    </Transition>
  )
}
