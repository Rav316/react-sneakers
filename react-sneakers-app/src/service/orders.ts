import type { OrderCreateDto, OrderItemResponse, OrderListItem } from './model';
import { axiosInstance } from './instance.ts';
import { ApiRoutes } from './constants.ts';

export const findAll = async (): Promise<OrderListItem[]> => {
  const response = await axiosInstance.get<OrderListItem[]>(ApiRoutes.ORDERS);
  return response.data;
}

export const findItemsByOrder = async (id: number): Promise<OrderItemResponse> => {
  const response = await axiosInstance.get<OrderItemResponse>(`${ApiRoutes.ORDERS}/${id}/items`);
  return response.data;
}

export const createOrder = async (data: OrderCreateDto): Promise<number> => {
  const response = await axiosInstance.post<number>(ApiRoutes.ORDERS, data);
  return response.data;
}

export const cancelOrder = async (id: number): Promise<void> => {
  const response = await axiosInstance.put(`${ApiRoutes.ORDERS}/${id}/cancel`);
  return response.data;
}