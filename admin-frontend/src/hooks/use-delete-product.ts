import { useMutation, useQueryClient } from 'react-query'

import { axiosClient } from '../utils/axios-client'

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  return useMutation<string, Error, string>(
    async productId => {
      try {
        const { data } = await axiosClient.delete<string>(
          `/admin/delete-product/${productId}`
        )
        return data
      } catch (error: any) {
        throw new Error(error.response?.data?.message ?? 'Error deleting product')
      }
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries('products')
      },
    }
  )
}
