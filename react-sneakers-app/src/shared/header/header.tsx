import styles from './header.module.scss';

import appLogo from '../../../public/app-logo.svg';
import cartIcon from '../../assets/cart.svg';
import favoritesIcon from '../../assets/favorites/favorites.svg';
import profileIcon from '../../assets/profile.svg';
import { useContext } from "react";
import { CartDrawerContext } from "../../context/cart-drawer-context.ts";

export const Header = () => {
  const {setIsDrawerOpen} = useContext(CartDrawerContext);

  return (
    <header className={styles.root}>
      <div className={styles.wrapper}>
        <img className={styles.logo} src={appLogo} alt={"app logo"}/>
        <div>
          <h2>REACT SNEAKERS</h2>
          <span>Магазин лучших кроссовок</span>
        </div>
      </div>

      <div className={styles.menu}>
        <div onClick={() => setIsDrawerOpen(true)} className={styles.menuItem}>
          <img src={cartIcon} alt={"cart icon"}/>
          <span>1205 руб.</span>
        </div>
        <div className={styles.menuItem}>
          <img src={favoritesIcon} alt={"favorites icon"}/>
          <span>Закладки</span>
        </div>
        <div className={styles.menuItem}>
          <img src={profileIcon} alt={"profile icon"}/>
          <span>Профиль</span>
        </div>
      </div>
    </header>
  )
}