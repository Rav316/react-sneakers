import styles from './login-tab.module.scss';
import * as React from 'react';
import { useEffect } from 'react';
import { clearError, login } from '../../../../redux/slice/auth-slice.ts';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../redux/store.ts';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { setIsModalOpen } from '../../../../redux/slice/auth-modal-slice.ts';
import { syncGuestFavorites } from '../../../../redux/slice/favorite-slice.ts';
import {
  formLoginSchema,
  type LoginData,
} from '../../../../schemas/auth-schema.ts';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  fetchCart,
  syncGuestCart,
} from '../../../../redux/slice/cart-slice.ts';
import { Button, FormInput } from '../../../../components/ui';

interface Props {
  onClickRegister: () => void;
}

export const LoginTab: React.FC<Props> = ({ onClickRegister }) => {
  const form = useForm<LoginData>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { loading, error, token } = useSelector(
    (state: RootState) => state.auth,
  );
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const cartItems = useSelector((state: RootState) => state.cart.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = (data: LoginData) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (token) {
      toast.success('Вы успешно вошли в аккаунт');
      dispatch(setIsModalOpen(false));
      dispatch(syncGuestFavorites(favorites));

      dispatch(
        syncGuestCart(
          cartItems.map((item) => ({
            sneakerItem: item.id,
            quantity: item.quantity,
          })),
        ),
      ).then(() => {
        dispatch(fetchCart());
      });
      navigate('/profile');
    }
  }, [cartItems, dispatch, favorites, navigate, token]);

  useEffect(() => {
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
      <FormProvider {...form}>
        <form
          className={styles.elementWrapper}
          onSubmit={form.handleSubmit(onSubmit)}
        >
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
      </FormProvider>
    </>
  );
};
