import { Outlet, useNavigate } from 'react-router-dom';
import { useAccount } from '../Account';

export const AdminLayout = () => {
  const { accountDetails } = useAccount();
  const navigate = useNavigate();
  if (!accountDetails || accountDetails.role !== 'admin') {
    console.log('Redirecting to /login');
    navigate('/auth/login');
  }
  return <Outlet />;
};
