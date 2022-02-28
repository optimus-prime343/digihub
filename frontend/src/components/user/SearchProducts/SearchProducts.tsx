import { TextInput } from '@mantine/core'
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { MdOutlineClear } from 'react-icons/md'

import { ProductAutoComplete } from '@/components/ui'
import { useProductsSearch } from '@/hooks/product'

import { useStyles } from './SearchProducts.styled'

const SearchProducts = () => {
  const { classes } = useStyles()
  const [searchQuery, setSearchQuery] = useState('')
  const { products } = useProductsSearch(searchQuery)
  return (
    <div className={classes.searchContainer}>
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
        <ProductAutoComplete
          onClickOutside={() => setSearchQuery('')}
          products={products}
          searchQuery={searchQuery}
        />
      ) : null}
    </div>
  )
}

export default SearchProducts
