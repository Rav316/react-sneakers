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
  type: SneakerType;
  imageUrl: string;
  price: number;
  firm: number;
  isFavorite: boolean;
}

export interface Sneaker {
  id: number;
  name: string;
  type: SneakerType;
  imageUrl: string;
  price: number;
  description: string;
  firm: string;
  items: SneakerItem[];
}

export interface SneakerItem {
  id: number;
  sneakerId: number;
  size: number;
}

export interface SneakerType {
  id: number;
  name: string;
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

export interface CartItemCreateDto {
  sneakerItem: number;
  quantity: number;
}

export interface CartItem {
  id: number;
  name: string;
  type: string;
  imageUrl: string;
  price: number;
  size: number;
  quantity: number;
}

export interface CartResponse {
  items: CartItem[];
  sum: number;
  tax: number;
}