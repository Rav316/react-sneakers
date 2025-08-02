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
import { EmptyCart } from '../empty-cart/empty-cart.tsx';
import { useState } from 'react';
import { OrderPlaced } from '../order-placed/order-placed.tsx';

export const CartDrawer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen } = useSelector((state: RootState) => state.cartDrawer);
  const { cart, loading, error } = useSelector(
    (state: RootState) => state.cart,
  );
  const token = useSelector((state: RootState) => state.auth.token);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const onCloseDrawer = () => dispatch(setIsDrawerOpen(false));
  const onClickPlaceOrder = () => setIsOrderPlaced(true);

  const isEmptyCart = !cart.items.length;
  const showError = !loading && error;
  const showEmpty = (!token || !loading) && isEmptyCart;
  const showSkeletons = loading && token;

  const renderItems = () =>
    showSkeletons
      ? Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} height={130} borderRadius={20} />
        ))
      : cart.items.map((item, i) => <DrawerItem key={i} item={item} />);

  const renderFooter = () => (
    <div className={styles.resultWrapper}>
      <div className={styles.resultInfoWrapper}>
        <div className={styles.resultInfo}>
          <span>Итого:</span>
          <div />
          <span className={styles.price}>{cart.sum} руб.</span>
        </div>
        <div className={styles.placeOrderButton} onClick={onClickPlaceOrder}>
          <span>Оформить заказ</span>
          <Arrow className={styles.arrowNext} direction="right" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div
        className={clsx(styles.overlay, { [styles.open]: isOpen })}
        onClick={onCloseDrawer}
      />

      <div className={clsx(styles.drawer, { [styles.open]: isOpen })}>
        {isOrderPlaced ? (
          <OrderPlaced />
        ) : showError ? (
          <CartError />
        ) : showEmpty ? (
          <EmptyCart />
        ) : (
          <>
            <div className={styles.infoWrapper}>
              <div className={styles.titleWrapper}>
                <h1>Корзина</h1>
                <div className={styles.removeButton} onClick={onCloseDrawer}>
                  <img src={closeIcon} alt="close icon" />
                </div>
              </div>

              <div className={styles.itemsWrapper}>{renderItems()}</div>
            </div>

            {renderFooter()}
          </>
        )}
      </div>
    </>
  );

};
