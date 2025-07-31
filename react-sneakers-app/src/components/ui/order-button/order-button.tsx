import styles from './order-button.module.scss';
import * as React from 'react';
import { type OrderStatus, STATUS_LABELS } from '../../../constants/order-status.ts';
import clsx from 'clsx';

interface Props {
  status: OrderStatus;
}

export const OrderButton: React.FC<Props> = ({ status }) => {
  return (
    <button className={clsx(styles.orderButton, styles[status])}>
      {STATUS_LABELS[status]}
    </button>
  );
};
