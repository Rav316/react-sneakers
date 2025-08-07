import closeIcon from '../../../assets/close.svg';
import styles from './drawer.module.scss';
import { DrawerItem } from '../drawer-item/drawer-item.tsx';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../redux/store.ts';
import { setIsDrawerOpen } from '../../../redux/slice/cart-drawer-slice.ts';
import { EmptyCart } from '../empty-cart/empty-cart.tsx';
import { useState } from 'react';
import { OrderPlaced } from '../order-placed/order-placed.tsx';
import { createOrder } from '../../../redux/slice/cart-slice.ts';
import type { OrderCreateDto } from '../../../service/model';
import { unwrapResult } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { Arrow, Skeleton } from '../../ui';
import { CartError } from '../error';

export const CartDrawer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen } = useSelector((state: RootState) => state.cartDrawer);
  const { cart, loading, error, changeStatus } = useSelector(
    (state: RootState) => state.cart,
  );
  const token = useSelector((state: RootState) => state.auth.token);
  const [orderId, setOrderId] = useState<number | null>(null);

  const onCloseDrawer = () => dispatch(setIsDrawerOpen(false));
  const onClickPlaceOrder = async () => {
    if (!token) {
      toast.error('Войдите в аккаунт, чтобы оформить заказ');
      return;
    }
    const orderCreateDto: OrderCreateDto = {
      items: cart.items.map((item) => ({
        sneakerItem: item.sneakerItemId,
        quantity: item.quantity,
      })),
    };
    const action = await dispatch(createOrder(orderCreateDto));
    try {
      const result = unwrapResult(action);
      setOrderId(result);
      toast(
        'Заказ успешно оформлен.🎉\nСсылка для оплаты заказа отправлена вам на почту',
        {
          duration: 6000,
        },
      );
    } catch {
      toast.error('Ошибка при оформлении заказа');
    }
  };

  const isEmptyCart = !cart.items.length;
  const showError = !loading && error;
  const showEmpty = (!token || !loading) && isEmptyCart;
  const showSkeletons = loading && token;

  const renderItems = () => {
    if (showSkeletons) {
      return Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} height={130} borderRadius={20} />
      ));
    }

    return (
      <AnimatePresence initial={false}>
        {cart.items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{
              opacity: 0,
              height: 0,
              transition: { duration: 0.3 },
            }}
            transition={{ duration: 0.2 }}
          >
            <DrawerItem item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    );
  };

  const renderFooter = () => (
    <div className={styles.resultWrapper}>
      <div className={styles.resultInfoWrapper}>
        <div className={styles.resultInfo}>
          <span>Итого:</span>
          <div />
          <span className={styles.price}>{cart.sum} руб.</span>
        </div>
        <button
          disabled={changeStatus.loading}
          className={clsx(styles.placeOrderButton)}
          onClick={onClickPlaceOrder}
        >
          <span>Оформить заказ</span>
          <Arrow className={styles.arrowNext} direction="right" />
        </button>
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
        {orderId ? (
          <OrderPlaced orderId={orderId} onClick={() => setOrderId(null)} />
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
