import type { OrderItemResponse, OrderListItem } from './model';
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