import styles from './header.module.scss';

import cartIcon from '../../../assets/cart.svg';
import favoritesIcon from '../../../assets/favorites/favorites.svg';
import profileIcon from '../../../assets/profile.svg';
import { HeaderLogo } from '../../ui/header-logo/header-logo.tsx';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../redux/store.ts';
import { setIsModalOpen } from '../../../redux/slice/auth-modal-slice.ts';
import { Link, useNavigate } from 'react-router';
import { setIsDrawerOpen } from '../../../redux/slice/cart-drawer-slice.ts';

export const Header = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onProfileClick = () => {
    if (token) {
      navigate('/profile');
    } else {
      dispatch(setIsModalOpen(true));
    }
  };

  return (
    <header className={styles.root}>
      <HeaderLogo />

      <div className={styles.menu}>
        <div
          onClick={() => dispatch(setIsDrawerOpen(true))}
          className={styles.menuItem}
        >
          <img src={cartIcon} alt={'cart icon'} />
          <span>1205 руб.</span>
        </div>
        <Link to={'/favorites'}>
          <div className={styles.menuItem}>
            <img src={favoritesIcon} alt={'favorites icon'} />
            <span>Закладки</span>
          </div>
        </Link>
        <div className={styles.menuItem} onClick={onProfileClick}>
          <img src={profileIcon} alt={'profile icon'} />
          <span>Профиль</span>
        </div>
      </div>
    </header>
  );
};
