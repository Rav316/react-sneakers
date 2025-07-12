import styles from './header.module.scss';

import cartIcon from '../../assets/cart.svg';
import favoritesIcon from '../../assets/favorites/favorites.svg';
import profileIcon from '../../assets/profile.svg';
import { HeaderLogo } from "../ui/header-logo/header-logo.tsx";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store.ts";
import { setIsDrawerOpen } from "../../redux/slice/cart-drawer-slice.ts";
import { setIsModalOpen } from "../../redux/slice/auth-modal-slice.ts";

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <header className={styles.root}>
      <HeaderLogo/>

      <div className={styles.menu}>
        <div onClick={() => dispatch(setIsDrawerOpen(true))} className={styles.menuItem}>
          <img src={cartIcon} alt={"cart icon"}/>
          <span>1205 руб.</span>
        </div>
        <div className={styles.menuItem}>
          <img src={favoritesIcon} alt={"favorites icon"}/>
          <span>Закладки</span>
        </div>
        <div className={styles.menuItem} onClick={() => dispatch(setIsModalOpen(true))}>
          <img src={profileIcon} alt={"profile icon"}/>
          <span>Профиль</span>
        </div>
      </div>
    </header>
  )
}