import styles from './empty-favorites.module.scss';
import pensiveFace from '../../../assets/pensive-face.png';
import { ButtonBack } from '../../ui/button-back/button-back.tsx';

export const EmptyFavorites = () => {
  return (
    <div className={styles.root}>
      <img className={styles.pensiveFace} src={pensiveFace} alt={'pensive face'} />
      <h3>Закладок нет :(</h3>
      <span className={styles.emptyText}>Вы ничего не добавили в закладки</span>
      <ButtonBack/>
    </div>
  )
}