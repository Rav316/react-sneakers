import styles from './sneaker-counter.module.scss';
import clsx from 'clsx';
import * as React from 'react';

interface Props {
  counter: number;
  onClickMinus?: () => void;
  onClickPlus?: () => void;
}

export const SneakerCounter: React.FC<Props> = ({
  counter,
  onClickMinus,
  onClickPlus,
}) => {
  return (
    <div className={styles.root}>
      <button
        className={clsx(styles.counterButton, styles.alt)}
        onClick={onClickMinus}
      >
        –
      </button>
      <span>{counter}</span>
      <button className={styles.counterButton} onClick={onClickPlus}>
        +
      </button>
    </div>
  );
};
