import styles from './main-layout.module.scss';
import * as React from 'react';
import type { PropsWithChildren } from 'react';

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.root}>{children}</div>
    </div>
  );
};
