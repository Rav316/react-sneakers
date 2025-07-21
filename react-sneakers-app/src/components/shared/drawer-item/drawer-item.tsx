import styles from './drawer-item.module.scss';
import closeIcon from '../../../assets/close.svg';
import type { CartItem } from '../../../service/model.ts';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../redux/store.ts';
import {
  decrementCartItemQuantity,
  removeFromCart,
  updateCartItemQuantity,
} from '../../../redux/slice/cart-slice.ts';
import { SneakerCounter } from '../sneaker-counter/sneaker-counter.tsx';
import clsx from 'clsx';
import { unwrapResult } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { useDebouncedCallback } from 'use-debounce';

interface Props {
  item: CartItem;
}

export const DrawerItem: React.FC<Props> = ({ item }) => {
  const { loading } = useSelector(
    (state: RootState) => state.cart.changeStatus,
  );
  const dispatch = useDispatch<AppDispatch>();
  const onClickRemove = async () => {
    try {
      const action = await dispatch(removeFromCart(item.id));
      unwrapResult(action);
    } catch {
      toast.error('Ошибка при увеличении количества товара');
    }
  };

  const onClickPlus = useDebouncedCallback(
    async () => {
      try {
        const action = await dispatch(
          updateCartItemQuantity({ id: item.id, quantity: 1 }),
        );
        unwrapResult(action);
      } catch {
        toast.error('Ошибка при увеличении количества товара');
      }
    },
    150,
    { leading: true, trailing: false },
  );

  const onClickMinus = useDebouncedCallback(
    async () => {
      try {
        const action = await dispatch(decrementCartItemQuantity(item.id));
        unwrapResult(action);
      } catch {
        toast.error('Ошибка при уменьшении количества товара');
      }
    },
    150,
    { leading: true, trailing: false },
  );

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
        <SneakerCounter
          counter={item.quantity}
          onClickPlus={onClickPlus}
          onClickMinus={onClickMinus}
          small={true}
          minusDisabled={loading || item.quantity === 1}
          plusDisabled={loading}
        />
      </div>
      <div
        className={clsx(styles.removeButton, { [styles.disabled]: loading })}
        onClick={onClickRemove}
      >
        <img src={closeIcon} alt={'close icon'} />
      </div>
    </div>
  );
};
