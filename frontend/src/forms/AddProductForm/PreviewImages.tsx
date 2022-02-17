import Image from 'next/image'
import React, { FC } from 'react'

interface PreviewImageProperties {
  images: string[]
}

const PreviewImages: FC<PreviewImageProperties> = ({ images }) => {
  return (
    <div className='my-4 grid grid-cols-1 gap-4 lg:grid-cols-2'>
      {images.map((image, index) => (
        <Image
          alt={`Preview image ${index}`}
          className='rounded-md'
          height={250}
          key={index}
          objectFit='cover'
          src={image}
          width={250}
        />
      ))}
    </div>
  )
}

export default PreviewImages
