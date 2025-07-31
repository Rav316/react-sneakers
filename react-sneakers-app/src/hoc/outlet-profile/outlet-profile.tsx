import styles from './outlet-profile.module.scss';

import { Link, Outlet, useLocation } from 'react-router';

export const OutletProfile = () => {
  const location = useLocation();

  return (
    <div className={styles.root}>
      <div className={styles.tabs}>
        <Link to={'/profile'}>
          <span
            className={location.pathname === '/profile' ? styles.active : ''}
          >
            Профиль
          </span>
        </Link>
        <Link to={'/profile/orders'}>
          <span
            className={
              location.pathname === '/profile/orders' ? styles.active : ''
            }
          >
            Заказы
          </span>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};
