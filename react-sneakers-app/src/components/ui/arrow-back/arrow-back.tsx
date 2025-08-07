import styles from './arrow-back.module.scss';
import arrowBackIcon from '../../../assets/arrow-back/arrow-back-alt.svg';
import { useNavigate } from 'react-router';

export const ArrowBack = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.arrowBack} onClick={() => navigate(-1)}>
      <img src={arrowBackIcon} alt={'arrow back icon'} />
    </div>
  );
};
