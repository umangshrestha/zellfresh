import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import {
  DeliveryStatus,
  useOrders,
} from '@repo/api-client';
import ServerErrorComponent from '../../ServerErrorComponent';

export const OrdersAdminPage = () => {
  const { loading, error, loadMore, data, onChangeOrderStatus } = useOrders();

  if (loading) return <CircularProgress />;
  if (error) return <ServerErrorComponent error={error} />;

  return (
    <Box>
      <Typography variant="h5">Orders</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Order Meta</TableCell>
              <TableCell>Delivery Status</TableCell>
              <TableCell>Shipping Address</TableCell>
              <TableCell>Delivery Details</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Product Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.orders?.items?.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell>
                  <Typography variant="body2">
                    {`Order id: ${order.orderId}`}
                  </Typography>
                  <Typography variant="body2">
                    {`User id: ${order.orderId}`}
                  </Typography>
                  <Typography variant="body2">
                    {`Created At: ${order.createdAt}`}
                  </Typography>
                  <Typography variant="body2">
                    {`Updated At: ${order.updatedAt}`}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Select
                    variant={'outlined'}
                    value={order.deliveryStatus}
                    onChange={(e) =>
                      onChangeOrderStatus(
                        order.userId,
                        order.orderId,
                        e.target.value as DeliveryStatus,
                      )
                    }
                  >
                    {Object.values(DeliveryStatus).map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell className="flex flex-col">
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Shipping Details
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {`Name: ${order.contactDetails.name}`}
                    </Typography>
                    <Typography variant="body2">
                      {`Phone: ${order.contactDetails.phone}`}
                    </Typography>
                    <Typography variant="body2">
                      {`Address: ${order.shippingAddress.street}`}
                    </Typography>
                    <Typography variant="body2">
                      {`Info: ${order.shippingAddress.additionalInfo || '-'}`}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      {`Subtotal: $${order.checkoutDetails.subTotal.toFixed(2)}`}
                    </Typography>
                    <Typography variant="body2">
                      {`Tax: $${order.checkoutDetails.tax.toFixed(2)}`}
                    </Typography>
                    <Typography variant="body2">
                      {`Delivery Price: $${order.checkoutDetails.deliveryPrice.toFixed(2)}`}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {`Total Price: $${order.checkoutDetails.totalPrice.toFixed(2)}`}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Product Id</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Product Price</TableCell>
                        <TableCell>Product Unit</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {order.items.map((item) => (
                        <TableRow key={item.productId}>
                          <TableCell>{item.productId}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{item.price}</TableCell>
                          <TableCell>{item.product?.name}</TableCell>
                          <TableCell>{item.product?.price}</TableCell>
                          <TableCell>{item.product?.unit}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        disabled={!data?.orders?.pagination.next}
        onClick={loadMore}
        color="primary"
        size="small"
      >
        Show more
      </Button>
    </Box>
  );
};
