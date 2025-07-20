import type { CartItemCreateDto, CartResponse } from './model.ts';
import { axiosInstance } from './instance.ts';
import { ApiRoutes } from './constants.ts';

export const findAll = async (): Promise<CartResponse> => {
  const response = await axiosInstance.get<CartResponse>(ApiRoutes.CART);
  return response.data;
}

export const addToCart = async (data: CartItemCreateDto): Promise<void> => {
  const response = await axiosInstance.post(ApiRoutes.CART, data);
  return response.data;
};
