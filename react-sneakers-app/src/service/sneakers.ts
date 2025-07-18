import type { PageResponse, SneakerListItem } from './model.ts';
import { axiosInstance } from './instance.ts';
import { ApiRoutes } from './constants.ts';
import type { Order } from '../constants/order.ts';

export interface SearchParams {
  page?: number;
  size?: number;
  search?: string;
  sort?: string;
  order?: Order;
}

export const findAll = async (
  params: SearchParams,
): Promise<PageResponse<SneakerListItem>> => {
  const response = await axiosInstance.get<PageResponse<SneakerListItem>>(
    ApiRoutes.SNEAKERS,
    { params },
  );
  return response.data;
};

export const findAllFavorites = async (): Promise<SneakerListItem[]> => {
  const response = await axiosInstance.get<SneakerListItem[]>(
    `${ApiRoutes.SNEAKERS}/favorites`,
  );
  return response.data;
};

export const findAllByIds = async (
  data: number[],
): Promise<SneakerListItem[]> => {
  const response = await axiosInstance.get<SneakerListItem[]>(
    `${ApiRoutes.SNEAKERS}/by-ids`,
    {
      params: {
        sneakerIds: data,
      },
    },
  );
  return response.data;
};

export const removeAllFavorites = async (): Promise<void> => {
  await axiosInstance.delete(`${ApiRoutes.SNEAKERS}/favorites`);
};

export const addToFavorites = async (id: number): Promise<void> => {
  await axiosInstance.put(`${ApiRoutes.SNEAKERS}/${id}/favorite`);
};

export const removeFromFavorites = async (id: number): Promise<void> => {
  await axiosInstance.delete(`${ApiRoutes.SNEAKERS}/${id}/favorite`);
};

export const syncGuestFavorites = async (data: number[]): Promise<void> => {
  await axiosInstance.put(`${ApiRoutes.SNEAKERS}/sync-favorites`, data);
};
