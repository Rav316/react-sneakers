import type { AuthResponse } from './model.ts';
import { axiosInstance } from './instance.ts';
import { ApiRoutes } from './constants.ts';
import type { LoginData, RegisterData } from '../modal/schema.ts';

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    `${ApiRoutes.AUTH}/register`,
    data,
  );
  return response.data;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    `${ApiRoutes.AUTH}/login`,
    data,
  );
  return response.data;
};

export const refreshToken = async (): Promise<AuthResponse> => {
  const response = await axiosInstance.put<AuthResponse>(
    `${ApiRoutes.AUTH}/refresh-token`,
  );
  return response.data;
};
