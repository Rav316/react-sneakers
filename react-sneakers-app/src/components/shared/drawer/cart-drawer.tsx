import closeIcon from '../../../assets/close.svg';
import styles from './drawer.module.scss';
import { DrawerItem } from '../drawer-item/drawer-item.tsx';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../redux/store.ts';
import { setIsDrawerOpen } from '../../../redux/slice/cart-drawer-slice.ts';
import { Arrow } from '../../ui/arrow.tsx';
import { CartError } from '../error/cart-error/cart-error.tsx';
import { Skeleton } from '../../ui/skeleton/skeleton.tsx';

export const CartDrawer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen } = useSelector((state: RootState) => state.cartDrawer);
  const { cart, loading, error } = useSelector(
    (state: RootState) => state.cart,
  );

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
        {!loading && error ? (
          <CartError />
        ) : (
          <>
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
                {
                  loading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                      <Skeleton key={index} height={130} borderRadius={20} />
                    ))
                  ) : (
                    cart.items.map((item, index) => (
                      <DrawerItem key={index} item={item} />
                    ))
                  )
                }
              </div>
            </div>
            <div className={styles.resultWrapper}>
              <div className={styles.resultInfoWrapper}>
                <div className={styles.resultInfo}>
                  <span>Итого:</span>
                  <div />
                  <span className={styles.price}>
                    {cart.sum} руб.
                  </span>
                </div>
                <div className={styles.placeOrderButton}>
                  <span>Оформить заказ</span>
                  <Arrow className={styles.arrowNext} direction={'right'} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
