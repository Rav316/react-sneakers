import styles from './auth-modal.module.scss';
import { HeaderLogo } from "../../shared/ui/header-logo/header-logo.tsx";
import { FormInput } from "../../shared/ui/input/form-input.tsx";
import { Button } from "../../shared/ui/button/button.tsx";

import closeIcon from '../../assets/close.svg';
import { useContext } from "react";
import { ModalContext } from "../../context/modal-context.ts";
import * as React from "react";

export const AuthModal = () => {
  const {setIsModalOpen} = useContext(ModalContext);

  const handleRootClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };


  return (
    <div className={styles.root} onClick={handleRootClick}>
      <div className={styles.modal}>
        <img onClick={() => setIsModalOpen(false)} className={styles.closeButton} src={closeIcon} alt={"close icon"}/>
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