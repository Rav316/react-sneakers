import './app.scss';
import HomePage from './pages/home-page/home-page.tsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './redux/store.ts';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router';
import { ErrorPage } from './pages/error-page/error-page.tsx';

import img404 from './assets/404.svg';
import { checkAuth } from './redux/slice/auth-slice.ts';
import { fetchCart } from './redux/slice/cart-slice.ts';
import { CartDrawer } from './components/shared';
import { AuthModal, CancelOrderModal } from './modals';
import { MainLayout, OutletHeader, OutletProfile, RequireAuth } from './hoc';
import * as React from 'react';

const SneakerDetailsPage = React.lazy(
  () => import('./pages/sneaker-details-page/sneaker-details-page'),
);
const ProfilePage = React.lazy(
  () => import('./pages/profile-page/profile-page'),
);
const OrdersPage = React.lazy(() => import('./pages/orders-page/orders-page'));
const FavoritesPage = React.lazy(
  () => import('./pages/favorites-page/favorites-page'),
);

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  const isDrawerOpen = useSelector(
    (state: RootState) => state.cartDrawer.isOpen,
  );
  const isAuthModalOpen = useSelector(
    (state: RootState) => state.authModal.isOpen,
  );
  const isCancelOrderModalOpen = useSelector(
    (state: RootState) => state.cancelOrderModal.isOpen,
  );

  useEffect(() => {
    if (isDrawerOpen || isAuthModalOpen || isCancelOrderModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen, isAuthModalOpen, isCancelOrderModalOpen]);

  useEffect(() => {
    if (token) {
      dispatch(fetchCart());
      dispatch(checkAuth());
    }
  }, [dispatch]);

  return (
    <>
      <Toaster position="top-center" />
      <CartDrawer />
      {isAuthModalOpen && <AuthModal />}
      {isCancelOrderModalOpen && <CancelOrderModal />}
      <MainLayout>
        <Routes>
          <Route element={<OutletHeader />}>
            <Route path={'/'} element={<HomePage />} />
            <Route path={'/sneakers/:id'} element={<SneakerDetailsPage />} />
            <Route
              element={
                <RequireAuth>
                  <OutletProfile />
                </RequireAuth>
              }
            >
              <Route path={'/profile'} element={<ProfilePage />} />
              <Route path={'/profile/orders'} element={<OrdersPage />} />
            </Route>
            <Route path={'/favorites'} element={<FavoritesPage />} />
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
