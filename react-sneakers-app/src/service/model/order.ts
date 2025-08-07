export interface OrderListItem {
  id: number;
  status: number;
  createdAt: Date;
}

export interface OrderItemResponse {
  orderId: number;
  items: OrderItem[];
  sum: number;
}

export interface OrderItem {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  size: number;
  quantity: number;
}

export interface OrderCreateDto {
  items: OrderItemCreateDto[];
}

export interface OrderItemCreateDto {
  sneakerItem: number;
  quantity: number;
}
