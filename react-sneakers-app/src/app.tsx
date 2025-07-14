import "./app.scss";
import { MainLayout } from "./layouts/main-layout/main-layout.tsx";
import HomePage from "./pages/home-page/home-page.tsx";
import { CartDrawer } from "./components/shared/drawer/cart-drawer.tsx";
import { useEffect } from "react";
import { AuthModal } from "./modal/auth-modal/auth-modal.tsx";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store.ts";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router";
import { OutletLayout } from "./layouts/outlet-layout.tsx";
import { ProfilePage } from "./pages/profile-page/profile-page.tsx";

const App = () => {
  const isDrawerOpen = useSelector(
    (state: RootState) => state.cartDrawer.isOpen,
  );
  const isModalOpen = useSelector((state: RootState) => state.authModal.isOpen);

  useEffect(() => {
    if (isDrawerOpen || isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen, isModalOpen]);

  return (
    <>
      <Toaster position="top-center" />
      <CartDrawer />
      {isModalOpen && <AuthModal />}
      <MainLayout>
        <Routes>
          <Route element={<OutletLayout />}>
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/profile"} element={<ProfilePage />} />
          </Route>
        </Routes>
      </MainLayout>
    </>
  );
};

export default App;
