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
import { DeliveryStatus } from '../../../__generated__/types.ts';
import ServerErrorComponent from '../../ServerErrorComponent';
import { useOrders } from '../Orders.hooks.ts';

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
              <TableCell>OrderId</TableCell>
              <TableCell>UserId</TableCell>
              <TableCell>Delivery Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Shipping Address</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Delivery Details</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Product Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.orders?.items?.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.userId}</TableCell>
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
                <TableCell>{order.createdAt}</TableCell>
                <TableCell>{order.updatedAt}</TableCell>
                <TableCell>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Street</TableCell>
                        <TableCell>Zip Code</TableCell>
                        <TableCell>Additional Info</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>{order.shippingAddress.street}</TableCell>
                        <TableCell>{order.shippingAddress.zip}</TableCell>
                        <TableCell>
                          {order.shippingAddress.additionalInfo ||
                            'No additional info'}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableCell>
                <TableCell>{order.contactDetails.name}</TableCell>
                <TableCell>{order.contactDetails.phone}</TableCell>
                <TableCell>{order.contactDetails.email}</TableCell>
                <TableCell>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Delivery Price</TableCell>
                        <TableCell>Sub Total</TableCell>
                        <TableCell>Tax</TableCell>
                        <TableCell>Discount</TableCell>
                        <TableCell>Total Price</TableCell>
                        <TableCell>Tax Percentage</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          {order.checkoutDetails.deliveryPrice}
                        </TableCell>
                        <TableCell>{order.checkoutDetails.subTotal}</TableCell>
                        <TableCell>{order.checkoutDetails.tax}</TableCell>
                        <TableCell>{order.checkoutDetails.discount}</TableCell>
                        <TableCell>
                          {order.checkoutDetails.totalPrice}
                        </TableCell>
                        <TableCell>
                          {order.checkoutDetails.taxPercentage}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
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
