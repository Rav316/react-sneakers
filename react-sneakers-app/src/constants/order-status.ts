export type OrderStatus = 'canceled' | 'cancel' | 'pending' | 'completed';

export const STATUS_LABELS: Record<OrderStatus, string> = {
  canceled: 'Отклонено',
  cancel: 'Отменить заказ',
  pending: 'В ожидании',
  completed: 'Оплачено',
};