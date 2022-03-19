import Image from 'next/image'

import { getImageUrl } from '../../utils/get-image-url'

interface Props {
  image: string
  name: string
}
export const ProductBanner = ({ image, name }: Props) => {
  return (
    <div className='relative h-[400px]'>
      <Image
        layout='fill'
        objectFit='cover'
        src={getImageUrl('product', image)}
        alt={name}
        className='rounded-md'
      />
      <h1 className='absolute bottom-4 left-4 rounded-md bg-white px-4 py-2 text-2xl font-bold uppercase text-gray-700 shadow-md'>
        {name}
      </h1>
    </div>
  )
}
