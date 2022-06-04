import 'swiper/css'
import 'swiper/css/pagination'

import { Button, Text, Title } from '@mantine/core'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { BiDetail } from 'react-icons/bi'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useFeaturedProducts } from '@/hooks/product'
import { IProduct } from '@/types/product'
import { getProductImageUrl } from '@/utils/getImageUrl'

export const FeaturedProducts = () => {
  const featuredProducts = useFeaturedProducts()

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
        <div className='space-y-2'>
          <Title order={2}>{product.name}</Title>
          <Text className='max-w-xl text-justify'>{product.description}</Text>
          <Button
            leftIcon={<BiDetail />}
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
      <SwiperSlide key={featuredProduct.id}>
        <FeaturedProductItem product={featuredProduct} />
      </SwiperSlide>
    ))
  }
  return (
    <Swiper
      autoplay
      loop
      modules={[Pagination]}
      pagination={{
        clickable: true,
      }}
    >
      {featuredProductSlides()}
    </Swiper>
  )
}
