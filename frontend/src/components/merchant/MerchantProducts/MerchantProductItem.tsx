import { Button } from '@mantine/core'
import { FC, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { MdSystemUpdateAlt } from 'react-icons/md'

import { IProduct } from '@/types/product'

import DeleteProductPrompt from '../../product/DeleteProductPrompt'
import ProductListItem from '../../product/ProductListItem'
import UpdateProductPrompt from '../../product/UpdateProductPrompt'

interface Props {
  product: IProduct
}

const MerchantProductItem: FC<Props> = ({ product }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  return (
    <>
      <DeleteProductPrompt
        id={product.id}
        name={product.name}
        opened={showDeleteModal}
        setOpened={setShowDeleteModal}
      />
      <UpdateProductPrompt
        description={product.description}
        id={product.id}
        name={product.name}
        opened={showUpdateModal}
        price={product.price}
        setOpened={setShowUpdateModal}
      />
      <div className='rounded-2xl bg-gray-800 p-4'>
        <ProductListItem product={product} />
        <div className='mt-2 flex gap-4'>
          <Button
            className='bg-indigo-600'
            leftIcon={<MdSystemUpdateAlt />}
            onClick={() => setShowUpdateModal(true)}
            variant='filled'
          >
            Update
          </Button>
          <Button
            className='bg-red-600 hover:bg-red-500'
            leftIcon={<AiOutlineDelete />}
            onClick={() => setShowDeleteModal(true)}
            variant='filled'
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  )
}

export default MerchantProductItem
