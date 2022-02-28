import { Layout } from '@/components/core'
import { RequestPasswordResetForm } from '@/features/auth'

const RequestPasswordResetPage = () => {
  return (
    <Layout title='Digihub | Request Password Reset'>
      <RequestPasswordResetForm />
    </Layout>
  )
}

export default RequestPasswordResetPage
