import styles from './pagination.module.scss';
import * as React from "react";

import arrowNextIcon from "../../../assets/arrow-next-green.svg";
import arrowPrevIcon from '../../../assets/arrow-back-green.svg'

interface Props {
  selectedPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({selectedPage, totalPages, onPageChange}) => {


  const handleClick = (page: number) => {
    if (page < 1 || page > totalPages || page === selectedPage) return;
    onPageChange?.(page);
  };

  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (selectedPage <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (selectedPage >= totalPages - 2) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      selectedPage - 2,
      selectedPage - 1,
      selectedPage,
      selectedPage + 1,
      selectedPage + 2,
    ];
  };
  const visiblePages = getVisiblePages();

  return (
    <div className={styles.root}>
      <ul className={styles.paginationList}>
        <li onClick={() => handleClick(selectedPage - 1)}>
          <img src={arrowPrevIcon} alt={"previous page"} />
        </li>
        {visiblePages.map((page) => (
          <li
            key={page}
            className={page === selectedPage ? styles.active : ''}
            onClick={() => handleClick(page)}
          >
            {page}
          </li>
        ))}
        <li onClick={() => handleClick(selectedPage + 1)}>
          <img src={arrowNextIcon} alt={"next page"} />
        </li>
      </ul>
    </div>
  );
};