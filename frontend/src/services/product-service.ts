import {
  AddReviewPayload,
  IProduct,
  IProductReview,
  UpdateProductPayload,
} from '@/types/product'
import { axiosClient } from '@/utils/axios-client'

export class ProductService {
  async getProduct(id: string) {
    try {
      const { data } = await axiosClient.get<IProduct>(`/products/${id}`)
      return data
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Failed to get product')
    }
  }
  async fetchProducts(page?: number) {
    // page is used for pagination
    //every page has 10 products
    try {
      const pageQuery = page ? `?page=${page}` : ''
      const { data } = await axiosClient.get<IProduct[]>(
        `/products${pageQuery}`
      )
      return data
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ?? 'Failed to fetch products'
      )
    }
  }
  async fetchMerchantProducts() {
    try {
      const { data } = await axiosClient.get<IProduct[]>('/products/me')
      return data
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ?? 'Failed to fetch merchant products'
      )
    }
  }
  async searchProducts(searchQuery: string) {
    try {
      const { data } = await axiosClient.get<IProduct[]>(
        `/products/search?searchQuery=${searchQuery}`
      )
      return data
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ?? 'Failed to search products'
      )
    }
  }
  async addProduct(formData: FormData) {
    try {
      const { data } = await axiosClient.post<IProduct>('/products', formData)
      return data
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Failed to add product')
    }
  }
  async deleteProduct(id: string) {
    try {
      const { data } = await axiosClient.delete<string>(`/products/${id}`)
      return data
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ?? 'Failed to delete product'
      )
    }
  }
  async updateProduct(updateProductPayload: UpdateProductPayload) {
    try {
      const { id, ...rest } = updateProductPayload
      const { data } = await axiosClient.patch<IProduct>(
        `/products/${id}`,
        rest
      )
      return data
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ?? 'Failed to update product'
      )
    }
  }
  async addProductReview(addReviewPayload: AddReviewPayload) {
    try {
      const { data: review } = await axiosClient.post<IProductReview>(
        '/reviews',
        addReviewPayload
      )
      return review
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ?? 'Failed to add product review'
      )
    }
  }
}
export const productService = new ProductService()
