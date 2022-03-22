import Image from 'next/image'
import React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  images: string[]
  width?: number
  height?: number
}

const PreviewImages = ({ images, width, height, ...rest }: Props) => {
  return (
    <div {...rest}>
      {images.map((image, index) => (
        <Image
          alt={`Preview image ${index}`}
          className='rounded-md'
          height={height ?? 200}
          key={index}
          objectFit='cover'
          src={image}
          width={width ?? 200}
        />
      ))}
    </div>
  )
}

export default PreviewImages
