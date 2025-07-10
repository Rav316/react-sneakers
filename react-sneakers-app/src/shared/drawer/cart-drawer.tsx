import arrowNextIcon from "../../assets/arrow-next.svg";
import closeIcon from "../../assets/close.svg";
import styles from "./drawer.module.scss";
import { DrawerItem } from "../drawer-item/drawer-item.tsx";
import { useContext } from "react";
import { CartDrawerContext } from "../../context/cart-drawer-context.ts";
import clsx from "clsx";

export const CartDrawer = () => {
  const { isDrawerOpen, setIsDrawerOpen } = useContext(CartDrawerContext);
  return (
    <>
      <div className={clsx(styles.overlay, { [styles.open]: isDrawerOpen })}/>
      <div className={clsx(styles.drawer, { [styles.open]: isDrawerOpen })}>
        <div className={styles.infoWrapper}>
          <div className={styles.titleWrapper}>
            <h1>Корзина</h1>
            <div className={styles.removeButton} onClick={() => setIsDrawerOpen(false)}>
              <div>
                <img src={closeIcon} alt={"close icon"} />
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
              <span>Итого:</span>
              <div />
              <span className={styles.price}>21 498 руб.</span>
            </div>
            <div className={styles.resultInfo}>
              <span>Налог 5%:</span>
              <div />
              <span className={styles.price}>1074 руб.</span>
            </div>
            <div className={styles.placeOrderButton}>
              <span>Оформить заказ</span>
              <img src={arrowNextIcon} alt={"arrow next icon"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
