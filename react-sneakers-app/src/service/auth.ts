import type { UserAuthData } from "./model.ts";
import { axiosInstance } from "./instance.ts";
import { ApiRoutes } from "./constants.ts";

export interface LoginData {
  email: string;
  password: string;
}

export const login = async (
  data: LoginData
): Promise<UserAuthData> => {
  const response = await axiosInstance.post<UserAuthData>(
    `${ApiRoutes.AUTH}/login`,
    data,
  );
  return response.data;
};