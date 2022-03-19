import { Transition } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { IProduct } from '../../typings/product'
import { getImageUrl } from '../../utils/get-image-url'

interface Props {
  product: IProduct
}
export const ProductItem = ({ product }: Props) => {
  // product detail dialog state
  const [productHovered, setProductHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setProductHovered(true)}
      onMouseLeave={() => setProductHovered(false)}
      className='relative rounded-md'
    >
      <Image
        src={getImageUrl('product', product.coverImage)}
        width={600}
        height={600}
        alt={product.name}
        objectFit='cover'
        className='rounded-md'
      />
      <Transition
        show={productHovered}
        className='absolute inset-0 flex items-center justify-center'
      >
        <Transition.Child
          enter='transition-opacity ease-linear duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity ease-linear duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='absolute inset-0 overflow-hidden rounded-md bg-black/75' />
        </Transition.Child>
        <Transition.Child
          className='z-10'
          enter='transition duration-200 ease-in'
          enterFrom='translate-y-4 opacity-0'
          enterTo='translate-y-0 opacity-100'
          leave='transition duration-200 ease-out'
          leaveFrom='translate-y-0 opacity-100'
          leaveTo='translate-y-4 opacity-0'
        >
          <Link href={`/products/${product.id}`}>
            <a className='mx-auto inline-block w-56 text-center text-2xl font-bold'>
              {product.name}
            </a>
          </Link>
        </Transition.Child>
      </Transition>
    </div>
  )
}
