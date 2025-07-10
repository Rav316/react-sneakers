import "./app.scss";
import { MainLayout } from "./layouts/main-layout/main-layout.tsx";
import HomePage from "./pages/home-page/home-page.tsx";
import { Header } from "./shared/header/header.tsx";

const App = () => {
  return (
    <MainLayout>
      <Header />
      <HomePage />
    </MainLayout>
  );
};

export default App;
