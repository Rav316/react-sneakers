import { axiosInstance } from './instance.ts';
import { ApiRoutes } from './constants.ts';
import type {
  CartItem,
  CartItemCreateDto,
  CartItemUpdateDto,
  CartResponse,
} from './model';

export const findAll = async (): Promise<CartResponse> => {
  const response = await axiosInstance.get<CartResponse>(ApiRoutes.CART);
  return response.data;
};

export const addToCart = async (data: CartItemCreateDto): Promise<CartItem> => {
  const response = await axiosInstance.post<CartItem>(ApiRoutes.CART, data);
  return response.data;
};

export const updateCartItemQuantity = async (
  data: CartItemUpdateDto,
): Promise<CartItem> => {
  const response = await axiosInstance.put<CartItem>(
    `${ApiRoutes.CART}/${data.id}`,
    { quantity: data.quantity },
  );
  return response.data;
};

export const syncGuestCart = async (
  data: CartItemCreateDto[],
): Promise<void> => {
  await axiosInstance.put(`${ApiRoutes.CART}/sync`, data);
};

export const decrementCartItemQuantity = async (id: number): Promise<void> => {
  const response = await axiosInstance.put(`${ApiRoutes.CART}/${id}/decrement`);
  return response.data;
};

export const removeFromCart = async (id: number): Promise<void> => {
  const response = await axiosInstance.delete(`${ApiRoutes.CART}/${id}`);
  return response.data;
};
