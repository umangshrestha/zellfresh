import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../components/Notification';
import { ORDERS_QUERY } from './OrdersPage.queries.tsx';
import OrderEmptyPage from '../../components/Order/OrderEmptyPage';

export const OrdersPage = () => {
  const { setNotification } = useNotification();
  const navigate = useNavigate();

  const { data, loading } = useQuery(ORDERS_QUERY, {
    onError: (error) => {
      setNotification({
        message: error.message,
        severity: 'error',
      });
    },
  });

  if (!loading && !data) {
    return <OrderEmptyPage onClick={() => navigate('/')} />;
  }
  return (
    <Box className="flex flex-col gap-4 max-w-xl mx-auto pt-3">
      <Typography variant="h4">Orders Page</Typography>
      <span>{JSON.stringify(data?.orders, null, 2)}</span>
    </Box>
  );
};
