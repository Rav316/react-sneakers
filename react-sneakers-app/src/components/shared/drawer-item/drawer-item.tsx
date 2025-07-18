import styles from './drawer-item.module.scss';
import sneakerExampleImg from '../../../assets/sneaker-example.jpg';
import closeIcon from '../../../assets/close.svg';

export const DrawerItem = () => {
  return (
    <div className={styles.root}>
      <img src={sneakerExampleImg} alt={'sneaker image'} />
      <div className={styles.infoWrapper}>
        <span>Мужские Кроссовки Nike Blazer Mid Suede</span>
        <span className={styles.price}>12 999 руб.</span>
      </div>
      <div className={styles.removeButton}>
        <img src={closeIcon} alt={'close icon'} />
      </div>
    </div>
  );
};
