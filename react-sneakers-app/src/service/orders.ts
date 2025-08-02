import type { OrderListItem } from './model';
import { axiosInstance } from './instance.ts';
import { ApiRoutes } from './constants.ts';

export const findAll = async (): Promise<OrderListItem[]> => {
  const response = await axiosInstance.get<OrderListItem[]>(ApiRoutes.ORDERS);
  return response.data;
}