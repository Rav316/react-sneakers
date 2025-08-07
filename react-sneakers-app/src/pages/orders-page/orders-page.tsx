import styles from './orders-page.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store.ts';
import { useEffect } from 'react';
import { fetchOrders } from '../../redux/slice/order-slice.ts';
import { EmptyOrders, ErrorResult, Order } from '../../components/shared';
import { Skeleton } from '../../components/ui';
import { FadeContent } from '../../hoc';

const OrdersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error } = useSelector(
    (state: RootState) => state.order,
  );

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (!loading && error) {
    return (
      <div className={styles.root}>
        <ErrorResult />
      </div>
    );
  }
  return (
    <div className={styles.root}>
      <h1>Мои заказы</h1>
      {!loading && !orders.length ? (
        <EmptyOrders />
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

export default OrdersPage;
