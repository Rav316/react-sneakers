import closeIcon from '../../../assets/close.svg';
import styles from './drawer.module.scss';
import { DrawerItem } from '../drawer-item/drawer-item.tsx';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../redux/store.ts';
import { setIsDrawerOpen } from '../../../redux/slice/cart-drawer-slice.ts';
import { Arrow } from '../../ui/arrow.tsx';

export const CartDrawer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen } = useSelector((state: RootState) => state.cartDrawer);

  const onCloseDrawer = () => {
    dispatch(setIsDrawerOpen(false));
  };

  return (
    <>
      <div
        className={clsx(styles.overlay, { [styles.open]: isOpen })}
        onClick={onCloseDrawer}
      />
      <div className={clsx(styles.drawer, { [styles.open]: isOpen })}>
        <div className={styles.infoWrapper}>
          <div className={styles.titleWrapper}>
            <h1>Корзина</h1>
            <div className={styles.removeButton} onClick={onCloseDrawer}>
              <div>
                <img src={closeIcon} alt={'close icon'} />
              </div>
            </div>
          </div>
          <div className={styles.itemsWrapper}>
            <DrawerItem />
            <DrawerItem />
            <DrawerItem />
            <DrawerItem />
            <DrawerItem />
            <DrawerItem />
          </div>
        </div>
        <div className={styles.resultWrapper}>
          <div className={styles.resultInfoWrapper}>
            <div className={styles.resultInfo}>
              <span>Налог 5%:</span>
              <div />
              <span className={styles.price}>1074 руб.</span>
            </div>
            <div className={styles.resultInfo}>
              <span>Итого:</span>
              <div />
              <span className={styles.price}>21 498 руб.</span>
            </div>
            <div className={styles.placeOrderButton}>
              <span>Оформить заказ</span>
              <Arrow className={styles.arrowNext} direction={'right'} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
