import styles from './header-logo.module.scss';
import appLogo from '../../../../public/app-logo.svg';
import { Link } from 'react-router';

export const HeaderLogo = () => {
  return (
    <Link to={'/'}>
      <div className={styles.wrapper}>
        <img className={styles.logo} src={appLogo} alt={'app logo'} />
        <div>
          <h2>REACT SNEAKERS</h2>
          <span>Магазин лучших кроссовок</span>
        </div>
      </div>
    </Link>
  );
};
