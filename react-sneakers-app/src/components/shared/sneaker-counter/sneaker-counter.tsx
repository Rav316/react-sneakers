import styles from './sneaker-counter.module.scss';
import clsx from 'clsx';
import * as React from 'react';

interface Props {
  counter: number;
  onClickMinus?: () => void;
  onClickPlus?: () => void;
  small?: boolean;
  minusDisabled?: boolean;
  plusDisabled?: boolean;
}

export const SneakerCounter: React.FC<Props> = ({
  counter,
  onClickMinus,
  onClickPlus,
  small = false,
  minusDisabled = counter === 1,
  plusDisabled = false,
}) => {
  return (
    <div className={clsx(styles.root, { [styles.small]: small })}>
      <button
        className={clsx(styles.counterButton, styles.alt)}
        onClick={onClickMinus}
        disabled={minusDisabled}
      >
        –
      </button>
      <span>{counter}</span>
      <button
        className={styles.counterButton}
        onClick={onClickPlus}
        disabled={plusDisabled}
      >
        +
      </button>
    </div>
  );
};
