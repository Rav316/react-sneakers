import type { User } from './user.ts';

export interface AuthResponse {
  user: User;
  token: string;
}
