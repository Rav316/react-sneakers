import styles from './order-payment-page.module.scss';
import successImg from '../../assets/success.svg';
import errorImg from '../../assets/error.svg';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store.ts';
import { useEffect, useRef } from 'react';
import { payForOrder } from '../../redux/slice/order-payment-slice.ts';
import { useParams } from 'react-router';
import clsx from 'clsx';

const OrderPaymentPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector(
    (state: RootState) => state.orderPayment,
  );
  const params = useParams();

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      dispatch(payForOrder(params.paymentId!));
      isInitialMount.current = false;
    }
  }, [dispatch, params.paymentId]);

  return (
    <div className={styles.root}>
      <div className={clsx(styles.stateContainer, {
        [styles.visible]: loading,
        [styles.hidden]: !loading
      })}>
        <span className={styles.loading}>Загрузка...</span>
      </div>

      <div className={clsx(styles.stateContainer, {
        [styles.visible]: !loading && !error,
        [styles.hidden]: loading || error
      })}>
        <img src={successImg} alt={'success image'} />
        <span>Заказ успешно оплачен. Спасибо за покупку!</span>
      </div>

      <div className={clsx(styles.stateContainer, {
        [styles.visible]: !loading && error,
        [styles.hidden]: loading || !error
      })}>
        <img src={errorImg} alt={'error image'} />
        <span>
          При оплате заказа произошла ошибка. Возможно, заказ уже оформлен или отменён.
        </span>
        <p>Для помощи свяжитесь с поддержкой reactSneaker@support.com</p>
      </div>
    </div>
  );
};

export default OrderPaymentPage;