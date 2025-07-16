import type { AppDispatch } from '../../redux/store.ts';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../../redux/slice/auth-slice.ts';
import toast from 'react-hot-toast';

export const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const onClickLogout = () => {
    toast('Вы успешно вышли из аккаунта', { icon: '👋' });
    dispatch(logout());
    navigate('/');
  };
  return (
    <>
      <div>ProfilePage</div>
      <button onClick={onClickLogout}>Logout</button>
    </>
  );
};
