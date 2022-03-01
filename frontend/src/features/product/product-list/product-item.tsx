import { Card, Text, Title } from '@mantine/core'
import Image from 'next/image'

import { NextLink, RatingStars } from '@/components/core'
import { IProduct } from '@/types/product'
import { getProductImageUrl } from '@/utils/getImageUrl'

interface Props {
  product: IProduct
}
export const ProductItem = ({ product }: Props) => {
  return (
    <Card padding='sm'>
      <Card.Section>
        <Image
          alt={product.name}
          height={300}
          objectFit='cover'
          src={getProductImageUrl(product.coverImage)}
          width={400}
        />
      </Card.Section>
      <div className='space-y-2'>
        <NextLink href={`/products/${product.id}`}>
          <Title order={4}>{product.name}</Title>
        </NextLink>
        <div className='flex items-center gap-2'>
          <RatingStars rating={product.averageRating} />
          <span>({product.totalRatings})</span>
        </div>
        <Text>Rs {product.price}</Text>
      </div>
    </Card>
  )
}
