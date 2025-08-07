import styles from './register-tab.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../redux/store.ts';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { setIsModalOpen } from '../../../../redux/slice/auth-modal-slice.ts';
import { clearError, register } from '../../../../redux/slice/auth-slice.ts';
import { FormProvider, useForm } from 'react-hook-form';
import {
  formRegisterSchema,
  type RegisterData,
} from '../../../../schemas/auth-schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormInput } from '../../../../components/ui';

export const RegisterTab = () => {
  const form = useForm<RegisterData>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const { loading, error, token } = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = (data: RegisterData) => {
    dispatch(register(data));
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
      <FormProvider {...form}>
        <form
          className={styles.elementWrapper}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput name="name" placeholder="Введите имя..." label="Имя" />
          <FormInput
            name="email"
            placeholder="Введите e-mail..."
            label="E-mail"
          />
          <FormInput
            name="password"
            placeholder="Введите пароль..."
            label="Пароль"
            type="password"
          />
          <div className={styles.buttonWrapper}>
            <Button
              width={'100%'}
              content={loading ? 'Регистрация...' : 'Зарегистрироваться'}
              type={'submit'}
              disabled={loading}
            />
          </div>
        </form>
      </FormProvider>
    </>
  );
};
