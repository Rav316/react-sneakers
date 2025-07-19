export interface PageResponse<T> {
  content: T[];
  metadata: Metadata;
}

export interface Metadata {
  page: number;
  size: number;
  totalElements: number;
}

export interface SneakerListItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  firm: number;
  isFavorite: boolean;
}

export interface User {
  id?: number;
  name?: string;
  email?: string;
  isActivated?: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ErrorResponse {
  code: number;
  message: string;
}
