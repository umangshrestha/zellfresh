import { Navigate, Outlet } from 'react-router-dom';
import { useAccount } from '../Account';

export const AdminLayout = () => {
  const { accountDetails } = useAccount();

  if (!accountDetails) {
    return <Navigate to="/auth/login" replace />;
  }

  if (accountDetails.role !== 'admin') {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};
