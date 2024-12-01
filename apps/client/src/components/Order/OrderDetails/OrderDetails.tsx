import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import OrderItem from '../OrderItem';
import { OrderDetailsProps } from './OrderDetails.types.ts';
import { DeliveryStatusChip } from '../../DeliveryStatusChip/DeliveryStatusChip.tsx';


export const OrderDetails = ({
  data,
  onCancelOrder,
  onSubmitFeedback,
}: OrderDetailsProps) => {
  return (
    <Box
      sx={{
        marginBottom: 2,
        padding: 2,
        borderRadius: 2,
      }}
    >
      <Grid>
        <ListItemText
          primary={
            <Typography variant="h6">
              Created At: {new Date(data.createdAt).toLocaleDateString()}
            </Typography>
          }
          secondary={
            <Typography component="span" variant="body2" color="textPrimary">
              {`Order ID: ${data.orderId}`}
            </Typography>
          }
        />
      </Grid>
      <DeliveryStatusChip deliveryStatus={data.deliveryStatus} />
      <Box className="flex gap-4 flex-wrap mx-auto pt-3 flex-row justify-between">
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Shipping Details
          </Typography>
          <Typography variant="body2">
            {`Name: ${data.contactDetails.name}`}
          </Typography>
          <Typography variant="body2">
            {`Phone: ${data.contactDetails.phone}`}
          </Typography>
          <Typography variant="body2">
            {`Address: ${data.shippingAddress.street}`}
          </Typography>
          <Typography variant="body2">
            {`City: ${data.shippingAddress.city}`}
          </Typography>
          <Typography variant="body2">
            {`Country: ${data.shippingAddress.country}`}
          </Typography>
          <Typography variant="body2">
            {`Zip: ${data.shippingAddress.zip}`}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Checkout Details
          </Typography>
          <Typography variant="body2">
            {`Subtotal: $${data.checkoutDetails.subTotal.toFixed(2)}`}
          </Typography>
          <Typography variant="body2">
            {`Tax: $${data.checkoutDetails.tax.toFixed(2)}`}
          </Typography>
          <Typography variant="body2">
            {`Delivery Price: $${data.checkoutDetails.deliveryPrice.toFixed(2)}`}
          </Typography>
          <Typography variant="body2">
            {`Discount: $${data.checkoutDetails.discount.toFixed(2)}`}
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {`Total Price: $${data.checkoutDetails.totalPrice.toFixed(2)}`}
          </Typography>
        </Box>
      </Box>

      <Typography variant="h6">Items ({data.items.length})</Typography>
      <List>
        {data.items.map((order, index) => (
            <OrderItem  key={index}{...order} />
        ))}
      </List>
      <Typography>Please rate your order</Typography>
      <Rating
        value={data?.review?.rating}
        precision={0.5}
        onChange={(_, newValue) =>
          onSubmitFeedback(data.orderId, newValue || 0)
        }
      />
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}
      >
        <Button
          color="error"
          fullWidth
          disabled={!data.canCancel}
          variant="outlined"
          onClick={() => onCancelOrder(data.orderId)}
          sx={{ marginRight: 1 }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};
