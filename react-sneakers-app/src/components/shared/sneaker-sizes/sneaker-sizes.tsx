import styles from './sneaker-sizes.module.scss';
import * as React from 'react';
import { sizes } from '../../../constants/sizes.ts';
import clsx from 'clsx';
import type { SneakerItem } from '../../../service/model';

interface Props {
  selectedItem: SneakerItem | null;
  onClickSize: (size: number) => void;
  availableItems: SneakerItem[];
}

export const SneakerSizes: React.FC<Props> = ({
  selectedItem,
  onClickSize,
  availableItems,
}) => {
  return (
    <div className={styles.root}>
      {sizes.map((size, index) => (
        <div
          key={index}
          className={clsx(styles.size, {
            [styles.unavailable]: !availableItems
              .map((item) => item.size)
              .includes(size),
            [styles.selected]: selectedItem?.size === size,
          })}
          onClick={() => onClickSize(size)}
        >
          {size}
        </div>
      ))}
    </div>
  );
};
