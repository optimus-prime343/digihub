import { Select } from '@mantine/core'
import { useCallback } from 'react'
import { MdSort } from 'react-icons/md'

import { IProduct } from '@/types/product'

interface Props {
  products: IProduct[]
  onSort: (products: IProduct[]) => void
}

export const SortProducts = ({ products, onSort }: Props) => {
  const sortProducts = useCallback(
    (value: string) => {
      //   sort products based on their price from lowest to highest
      if (value === 'price-asc') {
        onSort(products.sort((a, b) => a.price - b.price))
      }
      // sort products based on their price from highest to lowest
      if (value === 'price-desc') {
        onSort(products.sort((a, b) => b.price - a.price))
      }
      // sort products based on recently added date
      if (value === 'createdAt-asc') {
        onSort(
          products.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        )
      }
      // sort products based on rating from lowest to highest
      if (value === 'rating-asc') {
        onSort(products.sort((a, b) => a.averageRating - b.averageRating))
      }
      //sort products based on ratings from highest to lowest
      if (value === 'rating-desc') {
        onSort(products.sort((a, b) => b.averageRating - a.averageRating))
      }
    },
    [onSort, products]
  )

  return (
    <Select
      data={data}
      icon={<MdSort />}
      onChange={currentValue => sortProducts(currentValue ?? '')}
      placeholder='Sort Products'
    />
  )
}
const data = [
  {
    value: 'createdAt-asc',
    label: 'Newest First',
  },
  {
    value: 'price-asc',
    label: 'Price: Low to High',
  },
  {
    value: 'price-desc',
    label: 'Price: High to Low',
  },
  {
    value: 'rating-asc',
    label: 'Rating: Low to High',
  },
  {
    value: 'rating-desc',
    label: 'Rating: High to Low',
  },
]
