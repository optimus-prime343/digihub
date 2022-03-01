import Image from 'next/image'
import React, { useState } from 'react'

import { getProductImageUrl } from '@/utils/getImageUrl'

interface Props {
  productName: string
  images: string[]
}
const ProductDetailImage = ({ images, productName }: Props) => {
  const [displayImage, setDisplayImage] = useState(
    getProductImageUrl(images[0])
  )
  return (
    <div>
      <Image
        alt={`${productName} highlight image`}
        className='rounded-md'
        height={400}
        objectFit='cover'
        src={displayImage}
        width={400}
      />
      {images.length > 1 && (
        <div className='my-4 flex gap-2'>
          {images.map(image => (
            <Image
              alt={`${productName} small image`}
              height={50}
              key={image}
              objectFit='cover'
              onClick={() => setDisplayImage(getProductImageUrl(image))}
              src={getProductImageUrl(image)}
              width={100}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductDetailImage
