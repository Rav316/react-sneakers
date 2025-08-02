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
  sneakerItemId: number;
  size: number;
  quantity: number;
}

export interface CartResponse {
  items: CartItem[];
  sum: number;
}

export interface CartItemUpdateDto {
  id: number,
  quantity: number,
}