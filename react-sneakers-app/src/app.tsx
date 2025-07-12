import "./app.scss";
import { MainLayout } from "./layouts/main-layout/main-layout.tsx";
import HomePage from "./pages/home-page/home-page.tsx";
import { Header } from "./components/shared/header/header.tsx";
import { CartDrawer } from "./components/shared/drawer/cart-drawer.tsx";
import { useEffect } from "react";
import { AuthModal } from "./modal/auth-modal/auth-modal.tsx";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store.ts";

const App = () => {
  const isDrawerOpen = useSelector((state: RootState) => state.cartDrawer.isOpen);
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

  return (
        <>
          <CartDrawer/>
          {isModalOpen && <AuthModal/>}
          <MainLayout>
            <Header />
            <HomePage />
          </MainLayout>
        </>
  );
};

export default App;
