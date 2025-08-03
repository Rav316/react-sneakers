import styles from './orders-page.module.scss';
import { Order } from '../../components/shared/order/order.tsx';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store.ts';
import { useEffect } from 'react';
import { fetchOrders } from '../../redux/slice/order-slice.ts';
import { Skeleton } from '../../components/ui/skeleton/skeleton.tsx';
import { ErrorResult } from '../../components/shared/error/error-result/error-result.tsx';
import { EmptyOrders } from '../../components/shared/empty-orders/empty-orders.tsx';
import FadeContent from '../../hoc/animation/fade-content.tsx';

export const OrdersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error } = useSelector(
    (state: RootState) => state.order,
  );

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if(!loading && error) {
    return (
      <div className={styles.root}>
        <ErrorResult/>
      </div>
    )
  }
  return (
    <div className={styles.root}>
      <h1>Мои заказы</h1>
      {!loading && !orders.length ? (
        <EmptyOrders/>
      ) : (
        <div className={styles.orders}>
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                style={{ maxWidth: '900px' }}
                height={96}
                borderRadius={10}
                width={'100%'}
              />
            ))
            : orders.map((order) => (
              <FadeContent key={order.id}>
                <Order order={order} />
              </FadeContent>
            ))}
        </div>
      )}

    </div>
  );
};
