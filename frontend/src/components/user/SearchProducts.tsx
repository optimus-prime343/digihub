import { TextInput } from '@mantine/core'
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { MdOutlineClear } from 'react-icons/md'

import ProductAutocomplete from '@/components/ui/ProductAutocomplete'
import { useProductsSearch } from '@/hooks/product'

const SearchProducts = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const { products } = useProductsSearch(searchQuery)
  return (
    <div className='relative hidden max-w-lg flex-1 lg:block'>
      <TextInput
        icon={<BsSearch />}
        onChange={event => setSearchQuery(event.target.value)}
        placeholder='Search Products'
        rightSection={
          searchQuery ? (
            <MdOutlineClear onClick={() => setSearchQuery('')} />
          ) : null
        }
        size='md'
        value={searchQuery}
      />
      {searchQuery && products.length > 0 ? (
        <ProductAutocomplete
          onClickOutside={() => setSearchQuery('')}
          products={products}
          searchQuery={searchQuery}
        />
      ) : null}
    </div>
  )
}

export default SearchProducts
