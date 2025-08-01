import styles from './profile-page.module.scss';

import type { AppDispatch, RootState } from '../../redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../../redux/slice/auth-slice.ts';
import toast from 'react-hot-toast';
import { clearFavorites } from '../../redux/slice/favorite-slice.ts';
import { clearCart } from '../../redux/slice/cart-slice.ts';
import { FormInput } from '../../components/ui/input/form-input.tsx';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '../../components/ui/button/button.tsx';
import {
  formProfileSchema,
  type ProfileData,
} from '../../schemas/form-profile-schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Skeleton } from '../../components/ui/skeleton/skeleton.tsx';

export const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        password: '',
        newPassword: '',
      });
    }
  }, [user]);

  const form = useForm<ProfileData>({
    resolver: zodResolver(formProfileSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      password: '',
      newPassword: '',
    },
  });

  const onClickLogout = () => {
    toast('Вы успешно вышли из аккаунта', { icon: '👋' });
    dispatch(logout());
    dispatch(clearFavorites());
    dispatch(clearCart());
    navigate('/');
  };

  const onSubmit = (data: ProfileData) => {
    console.log('data', data);
  };
  return (
    <div className={styles.root}>
      <h1>Мой профиль</h1>
      <form
        className={styles.profileFields}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormProvider {...form}>
          {loading ? (
            <>
              <Skeleton height={50} borderRadius={10} />
              <Skeleton height={50} borderRadius={10} />
              <Skeleton height={50} borderRadius={10} />
              <Skeleton height={50} borderRadius={10} />
            </>
          ) : (
            <>
              <FormInput name={'name'} placeholder={'Введите имя...'} />
              <FormInput name={'email'} placeholder={'Введите почту...'} />
              <FormInput
                name={'password'}
                placeholder={'Введите текущий пароль...'}
              />
              <FormInput
                name={'newPassword'}
                placeholder={'Введите новый пароль...'}
              />
              <div className={styles.buttonWrapper}>
                <Button
                  width={'100%'}
                  content={'Обновить профиль'}
                  type={'submit'}
                />
              </div>
            </>
          )}
        </FormProvider>
      </form>
      <button
        type={'submit'}
        onClick={onClickLogout}
        className={styles.logoutButton}
      >
        Выйти
      </button>
    </div>
  );
};
