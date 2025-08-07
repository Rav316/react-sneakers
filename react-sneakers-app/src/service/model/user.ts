export interface User {
  id?: number;
  name?: string;
  email?: string;
  isActivated?: boolean;
}

export interface UserEditDto {
  name?: string;
  email?: string;
  currentPassword?: string;
  password?: string;
}
