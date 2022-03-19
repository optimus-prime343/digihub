import { Tab } from '@headlessui/react'
import classNames from 'classnames'

import { IProduct } from '../../typings/product'
import MerchantInfo from './merchant-info'
import { ProductBanner } from './product-banner'
import ProductInfo from './product-info'
import { ReviewList } from './review'

interface Props {
  product: IProduct
}
export const ProductDetail = ({ product }: Props) => {
  const tabClass = (selected: boolean) =>
    classNames('w-full text-lg py-2 rounded-lg p-4', {
      'bg-indigo-600 shadow-md': selected,
      'hover:bg-gray-700/25': !selected,
    })
  return (
    <div>
      <ProductBanner image={product.coverImage} name={product.name} />
      <div className='w-full max-w-md py-6'>
        <Tab.Group>
          <Tab.List className='grid grid-cols-3 space-x-1 rounded-xl bg-gray-800 p-2'>
            {['Description', 'Merchant', 'Reviews'].map((tab, index) => (
              <Tab key={index}>
                {({ selected }) => <div className={tabClass(selected)}>{tab}</div>}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className='my-6 rounded-md bg-white p-4 text-gray-800'>
            <Tab.Panel>
              <ProductInfo product={product} />
            </Tab.Panel>
            <Tab.Panel>
              <MerchantInfo merchant={product.merchant} />
            </Tab.Panel>
            <Tab.Panel>
              {product.reviews.length > 0 ? (
                <ReviewList reviews={product.reviews} />
              ) : (
                <p className='rounded-sm bg-red-100 p-2 text-lg text-red-600'>
                  No Reviews Yet
                </p>
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}
