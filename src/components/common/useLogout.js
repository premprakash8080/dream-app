import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return () => {
    dispatch(logout());
    navigate('/');
  };
};
