import type { User } from './model.ts';
import { axiosInstance } from './instance.ts';
import { ApiRoutes } from './constants.ts';

export const profile = async (): Promise<User> => {
  const response = await axiosInstance.get<User>(`${ApiRoutes.USERS}/profile`);
  return response.data;
};
