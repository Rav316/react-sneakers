import styles from './orders-page.module.scss';
import { Order } from '../../components/shared/order/order.tsx';

export const OrdersPage = () => {
  return (
    <div className={styles.root}>
      <h1>Мои заказы</h1>
      <div className={styles.orders}>
        <Order orderId={15} status={'completed'}/>
        <Order orderId={3728} status={'canceled'}/>
        <Order orderId={99} status={'pending'}/>
      </div>
    </div>
  )
}