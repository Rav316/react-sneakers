import styles from './login-tab.module.scss';
import { FormInput } from '../../../../components/ui/input/form-input.tsx';
import { Button } from '../../../../components/ui/button/button.tsx';
import * as React from 'react';
import { useEffect, useState } from 'react';
import type { LoginData } from '../../../../service/auth.ts';
import { clearError, login } from '../../../../redux/slice/auth-slice.ts';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../redux/store.ts';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { setIsModalOpen } from '../../../../redux/slice/auth-modal-slice.ts';

interface Props {
  onClickRegister: () => void;
}

export const LoginTab: React.FC<Props> = ({ onClickRegister }) => {
  const [form, setForm] = useState<LoginData>({ email: '', password: '' });
  const { loading, error, token } = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(form));
  };

  useEffect(() => {
    if (token) {
      toast.success('Вы успешно вошли в аккаунт');
      dispatch(setIsModalOpen(false));
      navigate('/profile');
    }
  }, [dispatch, navigate, token]);

  useEffect(() => {
    console.log(error);
    if (error) {
      if (error.code === 403) {
        toast.error('Неправильный логин или пароль');
      } else {
        toast.error(`Произошла ошибка: ${error.message}`);
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
      <h1>Вход</h1>
      <form className={styles.elementWrapper} onSubmit={handleSubmit}>
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
            content={'Войти'}
            type={'submit'}
            disabled={loading}
          />
          <span>
            Впервые на сайте?{' '}
            <span onClick={onClickRegister} className={styles.register}>
              Зарегистрируйтесь
            </span>
          </span>
        </div>
      </form>
    </>
  );
};
