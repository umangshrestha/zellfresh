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
import { useState } from 'react';
import RatingDialog from '../../RatingDialog';


export const OrdersPage = () => {
  const { loading, error, loadMore, onSubmitFeedback, data, ...props } = useOrders();
  const [feedbackId, setFeedbackId] = useState<string | null>(null);
  const [currentRating, setCurrentRating] = useState<number>(0);

  if (loading) return <CircularProgress />;
  if (error) return <ServerErrorComponent error={error} />;


  if (!data?.orders?.items?.length) return <OrderEmptyPage />;

  const onClose = (rating: number, comment: string) => {
    setFeedbackId(null)
    if (feedbackId)
    onSubmitFeedback(feedbackId, rating, comment);
  }

  return (
    <Box className="flex flex-col gap-4 max-w-xl mx-auto pt-3">
      {
        feedbackId && (
          <RatingDialog
            loading={false}
            currentRating={currentRating || 0}
            lastRating={
              data.orders.items.find((order) => order.orderId === feedbackId)?.review?.rating || 0
            }
            comment={
              data.orders.items.find((order) => order.orderId === feedbackId)?.review?.comment || ''
            }
            submitFeedback={onClose}
          />
        )
      }
      <Typography variant="h5">Orders</Typography>
      <List>
        {data.orders?.items?.map((order) => (
          <ListItem key={order.orderId}>
            <OrderDetails data={order} {...props} onSubmitFeedback={
              (orderId: string, rating: number) => {
                setFeedbackId(orderId);
                setCurrentRating(rating);
              }
            }/>
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
