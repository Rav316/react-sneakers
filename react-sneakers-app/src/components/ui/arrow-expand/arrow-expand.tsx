import styles from './arrow-expand.module.scss';

import * as React from 'react';

interface Props {
  expanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ArrowExpand: React.FC<Props> = ({ expanded, setIsExpanded }) => {
  return (
    <svg
      width="21"
      height="12"
      viewBox="0 0 11.5063 6.50307"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => setIsExpanded((prev) => !prev)}
      className={`${styles.arrowIcon} ${expanded ? styles.rotated : ''}`}
    >
      <path
        d="M10.75 0.75L5.75 5.75L0.75 0.75"
        stroke="#C8C8C8"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};
