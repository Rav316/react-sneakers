import styles from './profile-page.module.scss';

import type { AppDispatch, RootState } from '../../redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout, updateProfile } from '../../redux/slice/auth-slice.ts';
import toast from 'react-hot-toast';
import { clearFavorites } from '../../redux/slice/favorite-slice.ts';
import { clearCart } from '../../redux/slice/cart-slice.ts';
import { FormInput } from '../../components/ui/input/form-input.tsx';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '../../components/ui/button/button.tsx';
import {
  formProfileSchema,
  type ProfileData,
} from '../../schemas/profile-schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { ProfileFormSkeleton } from '../../components/shared/profile-form-skeleton/profile-form-skeleton.tsx';
import { unwrapResult } from '@reduxjs/toolkit';
import type { ErrorResponse } from '../../service/model';

export const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(loading);
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

  const onSubmit = async(data: ProfileData) => {
    try {
      const action = await dispatch(updateProfile(Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== '')
      )));
      unwrapResult(action);
      toast.success('Профиль успешно обновлен');
    } catch (err) {
      const error = err as ErrorResponse;
      switch (error.code) {
        case 409:
          toast.error('Пользователь с такой почтой уже существует');
          break;
        case 403:
          toast.error('Неправильно введен текущий пароль');
          break;
        default:
          toast.error('Ошибка при обновлении профиля');
      }
    }
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
            <ProfileFormSkeleton/>
          ) : (
            <>
              <FormInput name={'name'} placeholder={'Введите имя...'} />
              <FormInput name={'email'} placeholder={'Введите почту...'} />
              <FormInput
                name={'password'}
                placeholder={'Введите текущий пароль...'}
                type={'password'}
              />
              <FormInput
                name={'newPassword'}
                placeholder={'Введите новый пароль...'}
                type={'password'}
              />
              <div className={styles.buttonWrapper}>
                <Button
                  disabled={loading}
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
