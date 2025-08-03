import styles from './button-back.module.scss';
import { Arrow } from '../arrow.tsx';
import * as React from 'react';

interface Props {
  onClick?: () => void;
  text?: string;
}

export const ButtonBack: React.FC<Props> = ({
  text = 'Вернуться назад',
  onClick,
}) => {
  return (
    <button className={styles.backButton} onClick={onClick}>
      <Arrow />
      <span>{text}</span>
    </button>
  );
};
