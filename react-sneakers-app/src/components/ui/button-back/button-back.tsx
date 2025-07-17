import styles from './button-back.module.scss';
import { useNavigate } from 'react-router';
import { Arrow } from '../arrow.tsx';

export const ButtonBack = () => {
  const navigate = useNavigate();
  return (
    <button className={styles.backButton} onClick={() => navigate(-1)}>
      <Arrow />
      <span>Вернуться назад</span>
    </button>
  );
};
