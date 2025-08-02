import styles from './order-button.module.scss';
import * as React from 'react';
import {STATUS_LABELS, STATUS_MAP } from '../../../constants/order-status.ts';
import clsx from 'clsx';

interface Props {
  statusCode?: number;
}

export const OrderButton: React.FC<Props> = ({ statusCode }) => {
  const status = statusCode !== undefined ? STATUS_MAP[statusCode] : undefined;
  return (
    <button className={clsx(styles.orderButton, status ? styles[status] : styles.cancel)}>
      {status ? STATUS_LABELS[status] : 'Отменить заказ'}
    </button>
  );
};
