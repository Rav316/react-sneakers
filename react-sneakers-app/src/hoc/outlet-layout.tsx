import { Header } from '../components/shared/header/header.tsx';
import { Outlet } from 'react-router';

export const OutletLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
