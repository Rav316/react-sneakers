import './app.scss';
import { MainLayout } from './hoc/main-layout/main-layout.tsx';
import HomePage from './pages/home-page/home-page.tsx';
import { CartDrawer } from './components/shared/drawer/cart-drawer.tsx';
import { useEffect } from 'react';
import { AuthModal } from './modal/auth-modal/auth-modal.tsx';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './redux/store.ts';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router';
import { OutletLayout } from './hoc/outlet-layout.tsx';
import { ProfilePage } from './pages/profile-page/profile-page.tsx';
import { ErrorPage } from './pages/not-found-page/error-page.tsx';

import img404 from './assets/404.svg';
import { RequireAuth } from './hoc/require-auth.tsx';
import { checkAuth } from './redux/slice/auth-slice.ts';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  const isDrawerOpen = useSelector(
    (state: RootState) => state.cartDrawer.isOpen,
  );
  const isModalOpen = useSelector((state: RootState) => state.authModal.isOpen);

  useEffect(() => {
    if (isDrawerOpen || isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen, isModalOpen]);

  useEffect(() => {
    if (token) {
      dispatch(checkAuth());
    }
  }, [dispatch, token]);

  return (
    <>
      <Toaster position="top-center" />
      <CartDrawer />
      {isModalOpen && <AuthModal />}
      <MainLayout>
        <Routes>
          <Route element={<OutletLayout />}>
            <Route path={'/'} element={<HomePage />} />
            <Route
              path={'/profile'}
              element={
                <RequireAuth>
                  <ProfilePage />
                </RequireAuth>
              }
            />
            <Route
              path={'*'}
              element={
                <ErrorPage
                  image={img404}
                  title={'Страница не найдена'}
                  description={
                    'Проверьте корректность введённого адреса или повторите попытку позже'
                  }
                />
              }
            />
          </Route>
        </Routes>
      </MainLayout>
    </>
  );
};

export default App;
