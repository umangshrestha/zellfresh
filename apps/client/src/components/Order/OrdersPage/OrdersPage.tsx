import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useOrders } from '@repo/api-client';
import LoadingSpinner from '../../LoadingSpinner';
import RatingDialog from '../../Rating/RatingDialog';
import ServerErrorComponent from '../../ServerErrorComponent';
import { OrderDetails } from '../OrderDetails';
import OrderEmptyPage from '../OrderEmptyPage';

export const OrdersPage = () => {
  const { loading, error, loadMore, onSubmitFeedback, data, ...props } =
    useOrders();
  const [feedbackId, setFeedbackId] = useState<string | null>(null);
  const [currentRating, setCurrentRating] = useState<number>(0);

  if (loading) return <LoadingSpinner />;
  if (error) return <ServerErrorComponent error={error} />;

  if (!data?.orders?.items?.length) return <OrderEmptyPage />;

  const onClose = (rating: number, comment: string) => {
    setFeedbackId(null);
    if (feedbackId) onSubmitFeedback(feedbackId, rating, comment);
  };

  return (
    <Box className="flex flex-col gap-4 max-w-xl mx-auto pt-3">
      {feedbackId && (
        <RatingDialog
          loading={false}
          currentRating={currentRating || 0}
          lastRating={
            data.orders.items.find((order) => order.orderId === feedbackId)
              ?.review?.rating
          }
          comment={
            data.orders.items.find((order) => order.orderId === feedbackId)
              ?.review?.comment || ''
          }
          submitFeedback={onClose}
        />
      )}
      <Typography variant="h5">Orders</Typography>
      <List>
        {data.orders?.items?.map((order) => (
          <OrderDetails
            key={order.orderId}
            data={order}
            {...props}
            onSubmitFeedback={(orderId: string, rating: number) => {
              setFeedbackId(orderId);
              setCurrentRating(rating);
            }}
          />
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
