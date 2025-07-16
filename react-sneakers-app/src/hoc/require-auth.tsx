import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store.ts';
import * as React from 'react';
import type { PropsWithChildren } from 'react';
import { ErrorPage } from '../pages/not-found-page/error-page.tsx';

import img401 from '../assets/401.svg';

export const RequireAuth: React.FC<PropsWithChildren> = ({ children }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  if (!token) {
    return (
      <ErrorPage
        title={'Доступ запрещён'}
        description={
          'Данную страницу могут просматривать только авторизованные пользователи'
        }
        image={img401}
      />
    );
  }

  return <>{children}</>;
};
