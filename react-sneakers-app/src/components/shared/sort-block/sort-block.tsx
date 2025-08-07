import styles from './sort-block.module.scss';
import sortOrderIcon from '../../../assets/sort-order.svg';

import { useEffect, useRef, useState } from 'react';
import * as React from 'react';
import clsx from 'clsx';
import { type SortOption, sortOptions } from '../../../constants/sort.ts';
import type { Order } from '../../../constants/order.ts';

interface Props {
  order: Order;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
  sortOption: SortOption;
  setSortOption: React.Dispatch<React.SetStateAction<SortOption>>;
}

export const SortBlock: React.FC<Props> = ({
  order,
  setOrder,
  sortOption,
  setSortOption,
}) => {
  const [open, setOpen] = useState(false);
  const selectedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectedRef.current &&
        !selectedRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSelect = (option: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSortOption(
      sortOptions.find((o) => o.value === option) || sortOptions[0],
    );
    setOpen(false);
  };

  const onClickRoot = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className={styles.sortWrapper} onClick={onClickRoot}>
      <img
        onClick={() => setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
        className={clsx(styles.sortIcon, {
          [styles.rotated]: order === 'desc',
        })}
        src={sortOrderIcon}
        alt={'sort order icon'}
      />
      <span>Сортировать по:</span>
      <div className={`${styles.customSelect} ${open ? styles.open : ''}`}>
        <div ref={selectedRef} className={styles.selected}>
          {sortOption.label}
        </div>
        <ul className={styles.options}>
          {sortOptions.map((option) => (
            <li
              key={option.value}
              className={option.value === sortOption.value ? styles.active : ''}
              onClick={(e) => handleSelect(option.value, e)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
