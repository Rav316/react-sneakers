import type { PageResponse, SneakerListItem } from "./model.ts";
import { axiosInstance } from "./instance.ts";
import { ApiRoutes } from "./constants.ts";

export interface SearchParams {
  page?: number;
  size?: number;
  search?: string;
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
