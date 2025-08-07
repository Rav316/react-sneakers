import { Outlet } from 'react-router';
import { Header } from '../components/shared';

export const OutletHeader = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
