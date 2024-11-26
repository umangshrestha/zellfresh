import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import ServerErrorComponent from '../../ServerErrorComponent';
import { OrderDetails } from '../OrderDetails';
import OrderEmptyPage from '../OrderEmptyPage';
import { useOrders } from '../Orders.hooks.ts';

export const OrdersPage = () => {
  const { loading, error, loadMore, data, ...props } = useOrders();
  if (loading) return <CircularProgress />;
  if (error) return <ServerErrorComponent error={error} />;

  if (!data?.orders?.items?.length) return <OrderEmptyPage />;

  return (
    <Box className="flex flex-col gap-4 max-w-xl mx-auto pt-3">
      <Typography variant="h5">Orders</Typography>
      <List>
        {data.orders?.items?.map((order) => (
          <ListItem key={order.orderId}>
            <OrderDetails data={order} {...props} />
            <Divider />
          </ListItem>
        ))}
      </List>
      <Button
        disabled={!data.orders?.pagination.next}
        onClick={loadMore}
        color="primary"
        size="small"
      >
        show more
      </Button>
    </Box>
  );
};
