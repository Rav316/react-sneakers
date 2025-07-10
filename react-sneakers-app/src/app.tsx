import "./app.scss";
import { MainLayout } from "./layouts/main-layout/main-layout.tsx";
import HomePage from "./pages/home-page/home-page.tsx";
import { Header } from "./shared/header/header.tsx";
import { CartDrawer } from "./shared/drawer/cart-drawer.tsx";
import { CartDrawerContext } from "./context/cart-drawer-context.ts";
import { useState } from "react";

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <CartDrawerContext.Provider value={{isDrawerOpen, setIsDrawerOpen}}>
      <CartDrawer/>
      <MainLayout>
        <Header />
        <HomePage />
      </MainLayout>
    </CartDrawerContext.Provider>
  );
};

export default App;
