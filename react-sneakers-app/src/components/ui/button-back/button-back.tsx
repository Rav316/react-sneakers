import styles from './button-back.module.scss';
import { Arrow } from '../arrow.tsx';
import * as React from 'react';

interface Props {
  onClick?: () => void
}

export const ButtonBack: React.FC<Props> = ({onClick}) => {
  return (
    <button className={styles.backButton} onClick={onClick}>
      <Arrow />
      <span>Вернуться назад</span>
    </button>
  );
};
