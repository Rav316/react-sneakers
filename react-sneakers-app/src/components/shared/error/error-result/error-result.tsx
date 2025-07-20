import styles from './error-result.module.scss';
import screamingFace from '../../../../assets/screaming-face.png';
export const ErrorResult = () => {
  return (
    <div className={styles.root}>
      <img src={screamingFace} alt={'screaming face'} />
      <span>Что-то пошло не так. Попробуйте перезагрузить страницу.</span>
    </div>
  );
};
