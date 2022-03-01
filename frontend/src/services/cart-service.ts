import {
  AddToCartPayload,
  ICart,
  UpdateCartQuantityPayload,
} from '@/types/cart'
import { axiosClient } from '@/utils/axios-client'

class CartService {
  async fetchCarts(): Promise<ICart[]> {
    try {
      const { data } = await axiosClient.get<ICart[]>('/carts')
      return data
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Failed to fetch cart')
    }
  }
  async addToCart(addToCartPayload: AddToCartPayload): Promise<ICart> {
    try {
      const { data } = await axiosClient.post<ICart>('/carts', addToCartPayload)
      return data
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Failed to add to cart')
    }
  }
  async deleteCart(cartId: string): Promise<string> {
    try {
      const { data: message } = await axiosClient.delete<string>(
        `/carts/${cartId}`
      )
      return message
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Failed to delete cart')
    }
  }
  async updateCartQuantity(
    updateCartQuantity: UpdateCartQuantityPayload
  ): Promise<ICart> {
    try {
      const { id, quantity } = updateCartQuantity
      const { data: cart } = await axiosClient.patch<ICart>(`/carts/${id}`, {
        quantity,
      })
      return cart
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Failed to update cart')
    }
  }
}

export const cartService = new CartService()
