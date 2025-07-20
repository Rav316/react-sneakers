import type { CartItem, CartItemCreateDto, CartItemUpdateDto, CartResponse } from './model.ts';
import { axiosInstance } from './instance.ts';
import { ApiRoutes } from './constants.ts';

export const findAll = async (): Promise<CartResponse> => {
  const response = await axiosInstance.get<CartResponse>(ApiRoutes.CART);
  return response.data;
};

export const addToCart = async (data: CartItemCreateDto): Promise<CartItem> => {
  const response = await axiosInstance.post<CartItem>(ApiRoutes.CART, data);
  return response.data;
};

export const updateCartItemQuantity = async (
  data: CartItemUpdateDto
): Promise<CartItem> => {
  const response = await axiosInstance.put<CartItem>(
    `${ApiRoutes.CART}/${data.id}`,
    { quantity: data.quantity },
  );
  return response.data;
};
