import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { Button, Text, Title } from '@mantine/core'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { BiDetail } from 'react-icons/bi'
import Slider from 'react-slick'

import { IProduct } from '@/types/product'
import { getProductImageUrl } from '@/utils/getImageUrl'

interface Props {
  featuredProducts: IProduct[]
}
export const FeaturedProducts = ({ featuredProducts }: Props) => {
  const FeaturedProductItem = ({ product }: { product: IProduct }) => {
    const router = useRouter()
    return (
      <div className='flex flex-col gap-6 lg:flex-row'>
        <Image
          alt={product.name}
          className='rounded-md'
          height={400}
          objectFit='cover'
          src={getProductImageUrl(product.coverImage)}
          width={600}
        />
        <div>
          <Title mb='xs' order={2}>
            {product.name}
          </Title>
          <Text className='max-w-xl text-justify'>{product.description}</Text>
          <Button
            leftIcon={<BiDetail />}
            mt='lg'
            onClick={() => router.push(`/products/${product.id}`)}
          >
            View product page
          </Button>
        </div>
      </div>
    )
  }
  const featuredProductSlides = (): JSX.Element[] => {
    return featuredProducts.map(featuredProduct => (
      <div key={featuredProduct.id}>
        <FeaturedProductItem product={featuredProduct} />
      </div>
    ))
  }
  return (
    <Slider autoplay autoplaySpeed={2000} dots={true}>
      {featuredProductSlides()}
    </Slider>
  )
}
