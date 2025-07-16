import styles from './register-tab.module.scss';
import { FormInput } from '../../../../components/ui/input/form-input.tsx';
import { Button } from '../../../../components/ui/button/button.tsx';
import * as React from 'react';
import { useEffect, useState } from 'react';
import type { RegisterData } from '../../../../service/auth.ts';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../redux/store.ts';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { setIsModalOpen } from '../../../../redux/slice/auth-modal-slice.ts';
import { clearError, register } from '../../../../redux/slice/auth-slice.ts';

export const RegisterTab = () => {
  const [form, setForm] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
  });
  const { loading, error, token } = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register(form));
  };

  useEffect(() => {
    if (token) {
      toast.success('Вы успешно зарегистрировались');
      dispatch(setIsModalOpen(false));
      navigate('/profile');
    }
  }, [dispatch, navigate, token]);

  useEffect(() => {
    if (error) {
      if (error.code === 409) {
        toast.error('Пользователь с такой почтой уже существует');
      } else if (error.code === 400) {
        toast.error('Некорректные данные');
      }
    }
  }, [error]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <>
      <h1>Регистрация</h1>
      <form className={styles.elementWrapper} onSubmit={handleSubmit}>
        <FormInput
          placeholder={'Введите имя...'}
          id={'name'}
          label={'Имя'}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <FormInput
          placeholder={'Введите e-mail...'}
          id={'email'}
          label={'E-mail'}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <FormInput
          placeholder={'Введите пароль...'}
          id={'password'}
          label={'Пароль'}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <div className={styles.buttonWrapper}>
          <Button
            width={'100%'}
            content={'Зарегистрироваться'}
            type={'submit'}
            disabled={loading}
          />
        </div>
      </form>
    </>
  );
};
