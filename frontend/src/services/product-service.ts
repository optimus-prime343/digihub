import { IProduct, UpdateProductPayload } from '~types/product'
import { axiosClient } from '~utils/axiosClient'

export class ProductService {
  async fetchProducts() {
    const { data } = await axiosClient.get<IProduct[]>('/products')
    return data
  }
  async fetchMerchantProducts() {
    const { data } = await axiosClient.get<IProduct[]>('/products/me')
    return data
  }
  async addProduct(formData: FormData) {
    const { data } = await axiosClient.post<IProduct>('/products', formData)
    return data
  }
  async deleteProduct(id: string) {
    const { data } = await axiosClient.delete<string>(`/products/${id}`)
    return data
  }
  async updateProduct(updateProductPayload: UpdateProductPayload) {
    const { id, ...rest } = updateProductPayload
    const { data } = await axiosClient.patch<IProduct>(`/products/${id}`, rest)
    return data
  }
}
export const productService = new ProductService()
