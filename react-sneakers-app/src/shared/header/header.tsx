import styles from './header.module.scss';

import cartIcon from '../../assets/cart.svg';
import favoritesIcon from '../../assets/favorites/favorites.svg';
import profileIcon from '../../assets/profile.svg';
import { useContext } from "react";
import { CartDrawerContext } from "../../context/cart-drawer-context.ts";
import { HeaderLogo } from "../ui/header-logo/header-logo.tsx";
import { ModalContext } from "../../context/modal-context.ts";

export const Header = () => {
  const {setIsDrawerOpen} = useContext(CartDrawerContext);
  const {setIsModalOpen} = useContext(ModalContext);

  return (
    <header className={styles.root}>
      <HeaderLogo/>

      <div className={styles.menu}>
        <div onClick={() => setIsDrawerOpen(true)} className={styles.menuItem}>
          <img src={cartIcon} alt={"cart icon"}/>
          <span>1205 руб.</span>
        </div>
        <div className={styles.menuItem}>
          <img src={favoritesIcon} alt={"favorites icon"}/>
          <span>Закладки</span>
        </div>
        <div className={styles.menuItem} onClick={() => setIsModalOpen(true)}>
          <img src={profileIcon} alt={"profile icon"}/>
          <span>Профиль</span>
        </div>
      </div>
    </header>
  )
}