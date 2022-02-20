import React from 'react'

import { ResetPasswordForm } from '@/components/auth'
import { Layout } from '@/components/core'

const ResetPasswordPage = () => {
  return (
    <Layout title='Digihub | Reset Your password'>
      <ResetPasswordForm />
    </Layout>
  )
}

export default ResetPasswordPage
