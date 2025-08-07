import { axiosInstance } from './instance.ts';
import { ApiRoutes } from './constants.ts';
import type { User, UserEditDto } from './model';

export const updateProfile = async (data: UserEditDto): Promise<User> => {
  const response = await axiosInstance.put<User>(
    `${ApiRoutes.USERS}/profile`,
    data,
  );
  return response.data;
};
