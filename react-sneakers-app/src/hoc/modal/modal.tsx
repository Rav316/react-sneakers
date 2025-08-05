import styles from './modal.module.scss';

import * as React from 'react';
import { type PropsWithChildren, useState } from 'react';
import { setIsModalOpen } from '../../redux/slice/auth-modal-slice.ts';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store.ts';

export const Modal: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [mouseDownOnRoot, setMouseDownOnRoot] = useState(false);
  const onModalClose = () => {
    dispatch(setIsModalOpen(false));
  };

  const handleRootMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setMouseDownOnRoot(true);
    }
  };

  const handleRootMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mouseDownOnRoot && e.target === e.currentTarget) {
      onModalClose();
    }
    setMouseDownOnRoot(false);
  };

  const handleRootMouseLeave = () => {
    setMouseDownOnRoot(false);
  };

  return (
    <div
      className={styles.modal}
      onMouseDown={handleRootMouseDown}
      onMouseUp={handleRootMouseUp}
      onMouseLeave={handleRootMouseLeave}
    >
      {children}
    </div>
  );
};
