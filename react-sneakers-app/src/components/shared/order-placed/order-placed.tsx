import styles from './order-placed.module.scss';
import orderPlacedImg from '../../../assets/order-placed.svg';
import { ButtonBack } from '../../ui/button-back/button-back.tsx';
import { setIsDrawerOpen } from '../../../redux/slice/cart-drawer-slice.ts';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../redux/store.ts';
import * as React from 'react';

interface Props {
  orderId: number;
  onClick?: () => void
}

export const OrderPlaced: React.FC<Props> = ({orderId, onClick}) => {
  const dispatch = useDispatch<AppDispatch>();

  const onClickBack = () => {
    dispatch(setIsDrawerOpen(false));
    onClick?.();
  }

  return (
    <div className={styles.root}>
      <img src={orderPlacedImg} alt={'order placed'} />
      <h4>Заказ оформлен!</h4>
      <p>Ваш заказ #{orderId} скоро будет передан курьерской доставке</p>
      <ButtonBack onClick={onClickBack}/>
    </div>
  )
}