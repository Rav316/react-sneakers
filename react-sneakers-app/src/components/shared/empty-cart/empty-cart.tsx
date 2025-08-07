import styles from './empty-cart.module.scss';
import emptyCartImg from '../../../assets/empty-cart.svg';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../redux/store.ts';
import { setIsDrawerOpen } from '../../../redux/slice/cart-drawer-slice.ts';
import { ButtonBack } from '../../ui';

export const EmptyCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className={styles.root}>
      <img src={emptyCartImg} alt={'empty cart'} />
      <h4>Корзина пустая</h4>
      <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
      <ButtonBack onClick={() => dispatch(setIsDrawerOpen(false))} />
    </div>
  );
};
