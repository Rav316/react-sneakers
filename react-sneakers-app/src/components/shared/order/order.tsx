import styles from './order.module.scss';
import { OrderButton } from '../../ui/order-button/order-button.tsx';
import { ArrowExpand } from '../../ui/arrow-expand/arrow-expand.tsx';
import * as React from 'react';
import { OrderItem } from '../order-item/order-item.tsx';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ErrorResponse, OrderListItem } from '../../../service/model';
import { formatDateTime } from '../../../util/date-formatter.ts';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../redux/store.ts';
import { fetchOrderItems } from '../../../redux/slice/order-item-slice.ts';
import { Skeleton } from '../../ui/skeleton/skeleton.tsx';
import { openModal } from '../../../redux/slice/cancel-order-slice.ts';
import { Api } from '../../../service/api-client.ts';
import toast from 'react-hot-toast';
import type { AxiosError } from 'axios';

interface Props {
  order: OrderListItem;
}

export const Order: React.FC<Props> = ({
  order: { id, status, createdAt },
}) => {
  const staticUrl: string = import.meta.env.VITE_STATIC_URL;
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { itemsByOrderId, loadingByOrderId, errorByOrderId } = useSelector(
    (state: RootState) => state.orderItem,
  );

  const items = itemsByOrderId[id];
  const loading = loadingByOrderId[id];
  const error = errorByOrderId[id];

  useEffect(() => {
    if (isExpanded && !items && !loading) {
      dispatch(fetchOrderItems(id));
    }
  }, [isExpanded, id, items, loading, dispatch]);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isExpanded ? contentRef.current.scrollHeight : 0);
    }
  }, [isExpanded, items, loading]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (isExpanded && contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    });

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [isExpanded]);

  const formattedDate = useMemo(
    () => formatDateTime(new Date(createdAt)),
    [createdAt],
  );

  const onClickSendMail = async (id: number) => {
    try {
      await Api.orders.resendPaymentMail(id);
      toast.success('Письмо успешно отправлено');
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      console.log(error)
      switch (error.status) {
        case 429:
          toast.error('Слишком много запросов. Попробуйте через 5 минут');
          break;
        default:
          toast.error('Произошла ошибка');
      }
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.orderInfo}>
        <div className={styles.infoWrapper}>
          <span>Заказ #{id}</span>
          <p>{formattedDate}</p>
        </div>
        <div className={styles.buttonWrapper}>
          <OrderButton statusCode={status} />
          <ArrowExpand expanded={isExpanded} setIsExpanded={setIsExpanded} />
        </div>
      </div>

      <div
        ref={contentRef}
        className={styles.orderItemsContainer}
        style={{ height: contentHeight }}
        aria-hidden={!isExpanded}
      >
        <div className={styles.orderItems}>
          {loading && (
            <>
              {Array.from({ length: 1 }).map((_, i) => (
                <Skeleton key={i} height={80} borderRadius={10} />
              ))}
            </>
          )}

          {error && (
            <p className={styles.error}>Ошибка загрузки: {error.message}</p>
          )}

          {!loading &&
            items &&
            items.items.map((item) => (
              <OrderItem
                key={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                count={item.quantity}
                size={item.size}
                imageUrl={`${staticUrl}${item.imageUrl}`}
              />
            ))}
        </div>
        {!loading && items && (
          <div className={styles.result}>
            <div className={styles.infoWrapper}>
              <span>Итого:</span>
              <p>{items.sum} ₽</p>
            </div>
            {status === 1 && (
              <OrderButton onClick={() => dispatch(openModal(id))} />
            )}
          </div>
        )}
        {status === 1 && (
          <p className={styles.warning}>
            Письмо с ссылкой на оплату заказа отправлено вам на почту. Если вы не
            получили письмо, проверьте папку "Спам" или нажмите{' '}
            <span className={styles.sendMail} onClick={() => onClickSendMail(id)}>сюда</span>
          </p>
        )}
      </div>
    </div>
  );
};
