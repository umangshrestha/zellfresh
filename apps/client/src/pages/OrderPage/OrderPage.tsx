import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { ORDER_QUERY } from '../../components/Order/Order.queries.ts';
import OrderEmptyPage from '../../components/Order/OrderEmptyPage';
import { OrderList } from '../../components/Order/OrderList';

export const OrderPage = () => {
  const navigate = useNavigate();
  const { data, loading } = useQuery(ORDER_QUERY);
  if (loading) return <CircularProgress />;

  if (!data?.orders?.items?.length)
    return <OrderEmptyPage onClick={() => navigate('/')} />;

  return (
    <Box className="flex flex-col gap-4 max-w-xl mx-auto pt-3">
      <Typography variant="h5">Orders</Typography>
      <List>
        {data?.orders?.items?.map((order) => (
          <ListItem key={order.orderId}>
            <OrderList data={order} loading={loading} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
