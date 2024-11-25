import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { ORDER_QUERY } from '../../components/Order/Order.queries.ts';
import OrderEmptyPage from '../../components/Order/OrderEmptyPage';
import { OrderList } from '../../components/Order/OrderList';
import ServerErrorComponent from '../../components/ServerErrorComponent';

export const OrderPage = () => {
  const { data, loading, error } = useQuery(ORDER_QUERY);
  if (loading) return <CircularProgress />;
  if (error) return <ServerErrorComponent error={error} />;

  if (!data?.orders?.items?.length) return <OrderEmptyPage />;

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
