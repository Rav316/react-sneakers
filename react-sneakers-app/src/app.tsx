import './app.scss';
import { MainLayout } from './hoc/main-layout/main-layout.tsx';
import HomePage from './pages/home-page/home-page.tsx';
import { CartDrawer } from './components/shared/drawer/cart-drawer.tsx';
import { useEffect } from 'react';
import { AuthModal } from './modals/auth-modal/auth-modal.tsx';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './redux/store.ts';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router';
import { OutletHeader } from './hoc/outlet-header.tsx';
import { ProfilePage } from './pages/profile-page/profile-page.tsx';
import { ErrorPage } from './pages/error-page/error-page.tsx';

import img404 from './assets/404.svg';
import { RequireAuth } from './hoc/require-auth.tsx';
import { checkAuth } from './redux/slice/auth-slice.ts';
import { FavoritesPage } from './pages/favorites-page/favorites-page.tsx';
import { SneakerDetailsPage } from './pages/sneaker-details-page/sneaker-details-page.tsx';
import { fetchCart } from './redux/slice/cart-slice.ts';
import { OutletProfile } from './hoc/outlet-profile/outlet-profile.tsx';
import { OrdersPage } from './pages/orders-page/orders-page.tsx';

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
      dispatch(fetchCart());
      dispatch(checkAuth());
    }
  }, [dispatch]);

  return (
    <>
      <Toaster position="top-center" />
      <CartDrawer />
      {isModalOpen && <AuthModal />}
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
