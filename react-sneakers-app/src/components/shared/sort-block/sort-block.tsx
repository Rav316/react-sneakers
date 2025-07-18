import styles from './sort-block.module.scss';
import sortOrderIcon from '../../../assets/sort-order.svg';

import { useEffect, useRef, useState } from 'react';
import * as React from 'react';
import clsx from 'clsx';

const sortOptions = ['цене', 'алфавиту'];

export const SortBlock = () => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(sortOptions[0]);
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
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
    setSelectedOption(option);
    setOpen(false);
  };

  const onClickRoot = () => {
    console.log('clicked...');
    setOpen((prev) => !prev);
  };

  return (
    <div className={styles.sortWrapper} onClick={onClickRoot}>
      <img
        onClick={() => setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
        className={clsx(styles.sortIcon, {[styles.rotated]: order === 'asc'})}
        src={sortOrderIcon}
        alt={'sort order icon'}
      />
      <span>Сортировать по:</span>
      <div className={`${styles.customSelect} ${open ? styles.open : ''}`}>
        <div ref={selectedRef} className={styles.selected}>
          {selectedOption}
        </div>
        <ul className={styles.options}>
          {sortOptions.map((option) => (
            <li
              key={option}
              className={option === selectedOption ? styles.active : ''}
              onClick={(e) => handleSelect(option, e)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
