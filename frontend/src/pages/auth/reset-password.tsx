import React from 'react'

import { Layout } from '@/components/core'
import { ResetPasswordForm } from '@/features/auth'

const ResetPasswordPage = () => {
  return (
    <Layout title='Digihub | Reset Your password'>
      <ResetPasswordForm />
    </Layout>
  )
}

export default ResetPasswordPage
