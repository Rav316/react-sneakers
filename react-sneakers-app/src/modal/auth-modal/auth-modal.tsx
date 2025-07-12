import styles from './auth-modal.module.scss';
import { HeaderLogo } from "../../components/ui/header-logo/header-logo.tsx";
import { FormInput } from "../../components/ui/input/form-input.tsx";
import { Button } from "../../components/ui/button/button.tsx";

import closeIcon from '../../assets/close.svg';
import * as React from "react";
import { useDispatch } from "react-redux";
import { setIsModalOpen } from "../../redux/slice/auth-modal-slice.ts";
import type { AppDispatch } from "../../redux/store.ts";

export const AuthModal = () => {
  const dispatch = useDispatch<AppDispatch>();

  const onModalClose = () => {
    dispatch(setIsModalOpen(false))
  }

  const handleRootClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onModalClose();
    }
  };


  return (
    <div className={styles.root} onClick={handleRootClick}>
      <div className={styles.modal}>
        <img onClick={() => onModalClose()} className={styles.closeButton} src={closeIcon} alt={"close icon"}/>
        <HeaderLogo/>
        <h1>Вход</h1>
        <div className={styles.elementWrapper}>
          <FormInput placeholder={'Введите e-mail...'} id={'email'} label={'E-mail'}/>
          <FormInput placeholder={'Введите пароль...'} id={'password'} label={'Пароль'}/>
        </div>
        <div className={styles.elementWrapper}>
          <Button width={'100%'} content={'Войти'}/>
          <Button width={'100%'} content={'Регистрация'} alt={true}/>
        </div>
      </div>
    </div>
  )
};