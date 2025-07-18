import styles from './sneaker-sizes.module.scss';
import * as React from 'react';
import { sizes } from '../../../constants/sizes.ts';
import clsx from 'clsx';

interface Props {
  selectedSize: number | null;
  onClickSize: (size: number) => void;
  availableSizes: number[];
}

export const SneakerSizes: React.FC<Props> = ({
  selectedSize,
  onClickSize,
  availableSizes,
}) => {
  return (
    <div className={styles.root}>
      {sizes.map((size, index) => (
        <div
          key={index}
          className={clsx(styles.size, {
            [styles.unavailable]: availableSizes.includes(size),
            [styles.selected]: selectedSize === size,
          })}
          onClick={() => onClickSize(size)}
        >
          {size}
        </div>
      ))}
    </div>
  );
};
