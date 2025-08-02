import styles from './order.module.scss';
import { OrderButton } from '../../ui/order-button/order-button.tsx';
import { ArrowExpand } from '../../ui/arrow-expand/arrow-expand.tsx';
import * as React from 'react';
import { OrderItem } from '../order-item/order-item.tsx';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { OrderListItem } from '../../../service/model';
import { formatDateTime } from '../../../util/date-formatter.ts';

interface Props {
  order: OrderListItem;
}

export const Order: React.FC<Props> = ({
  order: { id, status, createdAt },
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      if (isExpanded) {
        setContentHeight(contentRef.current.scrollHeight);
      } else {
        setContentHeight(0);
      }
    }
  }, [isExpanded]);

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
          <OrderItem
            name={'Nike Zoom Vomero 5'}
            description={
              'Легкие и комфортные кроссовки Nike Zoom Vomero 5 идеально подойдут для повседневной активности и бега.'
            }
            price={1749.0}
            count={2}
            imageUrl={'http://192.168.0.105/sneaker/nike-zoom-vomero-5.jpg'}
          />
          <OrderItem
            name={'Vans Knu Skool'}
            description={
              'Свежий взгляд на классику с объемным языком и ретро-стилем.'
            }
            price={7799.0}
            count={1}
            imageUrl={'http://192.168.0.105/sneaker/vans-knu-skool.jpg'}
          />
          <OrderItem
            name={'Jordan Air Jordan 1 Mid'}
            description={
              'Легендарный стиль Майкла Джордана в современной интерпретации.'
            }
            price={23999.0}
            count={10}
            imageUrl={
              'http://192.168.0.105/sneaker/jordan-air-jordan-1-mid.jpg'
            }
          />
        </div>
        <div className={styles.result}>
          <div className={styles.infoWrapper}>
            <span>Итого:</span>
            <p>43998 ₽</p>
          </div>
          <OrderButton />
        </div>
      </div>
    </div>
  );
};
