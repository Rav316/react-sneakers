import styles from './empty-orders.module.scss';
import pleadingFace from '../../../assets/pleading-face.png';
import { ButtonBack } from '../../ui/button-back/button-back.tsx';
import { useNavigate } from 'react-router';

export const EmptyOrders = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.root}>
      <img src={pleadingFace} alt={'pleading face'} />
      <h3>У вас не заказов</h3>
      <p>Вы нищеброд?</p>
      <p>Оформите хотя бы один заказ.</p>
      <ButtonBack onClick={() => navigate('/')} text={'На главную страницу'} />
    </div>
  );
};
