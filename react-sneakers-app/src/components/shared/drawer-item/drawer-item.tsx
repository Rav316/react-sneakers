import styles from './drawer-item.module.scss';
import closeIcon from '../../../assets/close.svg';
import type { CartItem } from '../../../service/model.ts';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../redux/store.ts';
import { removeFromCart } from '../../../redux/slice/cart-slice.ts';

interface Props {
  item: CartItem;
}

export const DrawerItem: React.FC<Props> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();
  const onClickRemove = () => {
    dispatch(removeFromCart(item.id));
  };
  const staticUrl: string = import.meta.env.VITE_STATIC_URL;
  return (
    <div className={styles.root}>
      <img src={`${staticUrl}${item.imageUrl}`} alt={'sneaker image'} />
      <div className={styles.infoWrapper}>
        <span>{`${item.type} ${item.name}`}</span>
        <span className={styles.sizeQuantityInfo}>
          {item.size} размер, {item.quantity} шт.
        </span>
        <span className={styles.price}>{item.price * item.quantity} руб.</span>
      </div>
      <div className={styles.removeButton} onClick={onClickRemove}>
        <img src={closeIcon} alt={'close icon'} />
      </div>
    </div>
  );
};
