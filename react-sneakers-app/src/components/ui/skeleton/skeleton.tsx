import styles from './skeleton.module.scss';
import * as React from 'react';
import type { PropsWithChildren } from 'react';
import clsx from 'clsx';

interface Props {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: React.CSSProperties;
  className?: string;
}

export const Skeleton: React.FC<PropsWithChildren<Props>> = ({
  children,
  width = '100%',
  height,
  borderRadius,
  style,
  className,
}) => {
  const skeletonStyle = {
    width,
    height,
    borderRadius,
    ...style,
  };
  return (
    <div
      className={clsx(styles.skeletonWrapper, className)}
      style={skeletonStyle}
    >
      {children}
    </div>
  );
};
