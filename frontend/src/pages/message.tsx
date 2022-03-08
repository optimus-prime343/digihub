import { Alert } from '@mantine/core'
import { useRouter } from 'next/router'

import { WithAuth } from '@/components/core'
import { ChatBox } from '@/features/chat'
import { useUser } from '@/hooks/auth'
import { useProducts } from '@/hooks/product'
import { IUser, UserRole } from '@/types/user'

interface IQueryParams {
  productId: string
}

const MessagePage = () => {
  const router = useRouter()
  //   since this route is protected with WithAuth HOC, we can safely assume user to be defined
  const { user } = useUser()
  const { productId } = router.query as unknown as IQueryParams
  const { products } = useProducts()
  const product = products.find(product => product.id === productId)
  if (!product)
    return (
      <div className='p-4 lg:px-8 lg:py-4'>
        <Alert>Product doesn&apos;t exist</Alert>
      </div>
    )
  return <div></div>
}

export default WithAuth(MessagePage, {
  restrictTo: UserRole.USER,
})
