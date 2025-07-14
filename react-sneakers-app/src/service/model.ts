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
  description: string;
  firm: number;
}

export interface UserAuthData {
  id?: number;
  name?: string;
  email?: string;
  token?: string;
  isActivated?: boolean;
}

export interface ErrorResponse {
  code: number;
  message: string;
}