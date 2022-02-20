import { TextInput } from '@mantine/core'
import { useMemo, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { MdOutlineClear } from 'react-icons/md'

import ProductAutocomplete from '@/components/ui/ProductAutocomplete'
import { useProduct } from '@/context/product'

const SearchProducts = () => {
  const { products } = useProduct()
  const [searchQuery, setSearchQuery] = useState('')
  // Products which are shown as an autocomplete after user searches for a product
  const filteredProducts = useMemo(
    () =>
      products.filter(product =>
        product.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      ),
    [products, searchQuery]
  )
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
      {searchQuery && filteredProducts.length > 0 ? (
        <ProductAutocomplete
          onClickOutside={() => setSearchQuery('')}
          products={filteredProducts}
          searchQuery={searchQuery}
        />
      ) : null}
    </div>
  )
}

export default SearchProducts
