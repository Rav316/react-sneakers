import styles from './profile-page.module.scss';

import type { AppDispatch } from '../../redux/store.ts';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../../redux/slice/auth-slice.ts';
import toast from 'react-hot-toast';
import { clearFavorites } from '../../redux/slice/favorite-slice.ts';
import { clearCart } from '../../redux/slice/cart-slice.ts';
import { FormInput } from '../../components/ui/input/form-input.tsx';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '../../components/ui/button/button.tsx';

export const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      currentPassword: '',
      newPassword: ''
    }
  })

  const onClickLogout = () => {
    toast('Вы успешно вышли из аккаунта', { icon: '👋' });
    dispatch(logout());
    dispatch(clearFavorites());
    dispatch(clearCart())
    navigate('/');
  };
  return (
    <div className={styles.root}>
      <h1>Мой профиль</h1>
      <form className={styles.profileFields}>
        <FormProvider {...form}>
          <FormInput name={'name'} placeholder={'Введите имя...'}/>
          <FormInput name={'email'} placeholder={'Введите почту...'} />
          <FormInput name={'password'} placeholder={'Введите текущий пароль...'} />
          <FormInput name={'newPassword'} placeholder={'Введите новый пароль...'} />
          <div className={styles.buttonWrapper}>
            <Button width={'100%'} content={'Обновить профиль'} type={'submit'} />
          </div>
        </FormProvider>
      </form>
      <button onClick={onClickLogout} className={styles.logoutButton}>Выйти</button>
    </div>
  );
};
