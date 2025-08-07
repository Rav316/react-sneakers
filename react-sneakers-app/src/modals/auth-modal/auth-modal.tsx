import styles from './auth-modal.module.scss';

import closeIcon from '../../assets/close.svg';
import { useState } from 'react';
import { setIsModalOpen } from '../../redux/slice/auth-modal-slice.ts';
import type { AppDispatch } from '../../redux/store.ts';
import { useDispatch } from 'react-redux';
import { Modal } from '../../hoc';
import { Arrow, HeaderLogo } from '../../components/ui';
import { LoginTab, RegisterTab } from './tabs';

export const AuthModal = () => {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const onModalClose = () => {
    dispatch(setIsModalOpen(false));
  };

  return (
    <Modal>
      <div className={styles.root}>
        <img
          onClick={() => onModalClose()}
          className={styles.closeButton}
          src={closeIcon}
          alt={'close icon'}
        />
        {!isLoginTab && (
          <Arrow
            className={styles.backButton}
            color={'#D3D3D3'}
            onClick={() => setIsLoginTab(true)}
          />
        )}
        <HeaderLogo />
        {isLoginTab ? (
          <LoginTab onClickRegister={() => setIsLoginTab(false)} />
        ) : (
          <RegisterTab />
        )}
      </div>
    </Modal>
  );
};
