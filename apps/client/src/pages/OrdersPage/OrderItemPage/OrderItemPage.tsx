import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { useNotification } from '../../../components/Notification';
import { ORDER_ITEM_QUERY } from '../OrdersPage.queries.tsx';

export const OrderItemPage = () => {
  const { orderId } = useParams();
  const { setNotification } = useNotification();
  const { data, loading } = useQuery(ORDER_ITEM_QUERY, {
    onError: (error) => {
      setNotification({
        message: error.message,
        severity: 'error',
      });
    },
    variables: {
      orderId,
    },
  });
  console.log(data?.order, loading);

  return (
    <Box className="flex flex-col gap-4 max-w-xl mx-auto pt-3">
      <Typography variant="h4">{`Order ${orderId}`}</Typography>
      {JSON.stringify(data?.order, null, 2)}
    </Box>
  );
};
