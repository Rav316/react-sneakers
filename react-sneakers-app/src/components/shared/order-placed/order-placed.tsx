import styles from './order-placed.module.scss';
import orderPlacedImg from '../../../assets/order-placed.svg';
import { ButtonBack } from '../../ui/button-back/button-back.tsx';
import { setIsDrawerOpen } from '../../../redux/slice/cart-drawer-slice.ts';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../redux/store.ts';

export const OrderPlaced = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={styles.root}>
      <img src={orderPlacedImg} alt={'order placed'} />
      <h4>Заказ оформлен!</h4>
      <p>Ваш заказ #18 скоро будет передан курьерской доставке</p>
      <ButtonBack onClick={() => dispatch(setIsDrawerOpen(false))}/>
    </div>
  )
}