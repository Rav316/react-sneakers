import "./app.scss";
import { MainLayout } from "./layouts/main-layout/main-layout.tsx";
import HomePage from "./pages/home-page/home-page.tsx";
import { Header } from "./shared/header/header.tsx";
import { CartDrawer } from "./shared/drawer/cart-drawer.tsx";
import { CartDrawerContext } from "./context/cart-drawer-context.ts";
import { useEffect, useState } from "react";
import { AuthModal } from "./modal/auth-modal/auth-modal.tsx";
import { ModalContext } from "./context/modal-context.ts";

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <CartDrawerContext.Provider value={{isDrawerOpen, setIsDrawerOpen}}>
      <ModalContext.Provider value={{isModalOpen, setIsModalOpen}}>
        <CartDrawer/>
        {isModalOpen && <AuthModal/>}
        <MainLayout>
          <Header />
          <HomePage />
        </MainLayout>
      </ModalContext.Provider>
    </CartDrawerContext.Provider>
  );
};

export default App;
