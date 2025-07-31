import styles from './order-item.module.scss';
import clsx from 'clsx';
import * as React from 'react';

interface Props {
  name: string;
  description: string;
  price: number;
  count: number;
  imageUrl?: string;
}

export const OrderItem: React.FC<Props> = ({name, description, price, count, imageUrl}) => {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <img
          className={styles.sneakerImg}
          src={imageUrl}
          alt={'sneaker example'}
        />
        <div className={styles.infoWrapper}>
          <span className={styles.name}>{name}</span>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <div className={clsx(styles.infoWrapper, styles.priceCount)}>
        <span>{price} ₽</span>
        <p>x{count}</p>
      </div>
    </div>
  );
};
