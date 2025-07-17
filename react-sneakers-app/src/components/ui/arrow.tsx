import * as React from 'react';
import { type Direction, rotationMap } from '../../constants/rotation.ts';

interface Props {
  color?: string;
  className?: string;
  onClick?: () => void;
  direction?: Direction;
}

export const Arrow: React.FC<Props> = ({ className, color = '#ffffff', onClick, direction = 'left'}) => {
  return (
    <svg
      onClick={onClick}
      className={className}
      width="15.714355"
      height="14.008057"
      viewBox="0 0 15.7144 14.0081"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotationMap[direction]}deg)`}}
    >
      <defs />
      <path
        id="Vector"
        d="M14.71 7L1 7"
        stroke={color}
        strokeOpacity="1.000000"
        strokeWidth="2.000000"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        id="Vector"
        d="M7 13L1 7L7 1"
        stroke={color}
        strokeOpacity="1.000000"
        strokeWidth="2.000000"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};
