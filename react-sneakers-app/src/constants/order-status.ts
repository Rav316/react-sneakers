export type OrderStatus = 'canceled' | 'pending' | 'completed';

export const STATUS_MAP: Record<number, OrderStatus> = {
  0: 'canceled',
  1: 'pending',
  2: 'completed',
};

export const STATUS_LABELS: Record<OrderStatus, string> = {
  canceled: 'Отменено',
  pending: 'В ожидании',
  completed: 'Оплачено',
};