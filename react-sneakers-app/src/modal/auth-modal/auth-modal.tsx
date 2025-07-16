import styles from './auth-modal.module.scss';
import { HeaderLogo } from '../../components/ui/header-logo/header-logo.tsx';

import closeIcon from '../../assets/close.svg';
import arrowBackIcon from '../../assets/arrow-back/arrow-back.svg';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { setIsModalOpen } from '../../redux/slice/auth-modal-slice.ts';
import type { AppDispatch } from '../../redux/store.ts';
import { useState } from 'react';
import { LoginTab } from './tabs/login-tab/login-tab.tsx';
import { RegisterTab } from './tabs/register-tab/register-tab.tsx';

export const AuthModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [mouseDownOnRoot, setMouseDownOnRoot] = useState(false);
  const [isLoginTab, setIsLoginTab] = useState(true);

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
      className={styles.root}
      onMouseDown={handleRootMouseDown}
      onMouseUp={handleRootMouseUp}
      onMouseLeave={handleRootMouseLeave}
    >
      <div className={styles.modal}>
        <img
          onClick={() => onModalClose()}
          className={styles.closeButton}
          src={closeIcon}
          alt={'close icon'}
        />
        {!isLoginTab && (
          <img
            onClick={() => setIsLoginTab(true)}
            className={styles.backButton}
            src={arrowBackIcon}
            alt={'back icon'}
          />
        )}
        <HeaderLogo />
        {isLoginTab ? (
          <LoginTab onClickRegister={() => setIsLoginTab(false)} />
        ) : (
          <RegisterTab />
        )}
      </div>
    </div>
  );
};
