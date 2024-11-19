import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { gql } from '../../__generated__';
import { OrderList } from '../../components/Order/OrderList';


const ORDER_QUERY = gql(`
  query ListOrders {
  orders {
    items {
      createdAt
      deliveryStatus
      orderId
      updatedAt
      shippingAddress {
        apt
        street
        city
        state
        country
        zip
        additionalInfo
      }
      items {
        quantity
        price
        product {
          productId
          name
          imageUrl
          description
          unit
          category
        }
      }
    }
  }
}`);



export const OrderPage = () => {
  const { data, loading } = useQuery(ORDER_QUERY);

  console.log(data, loading);
  if (!loading && !data) {
    return <div>Empty</div>;
  }

  return (
    <Box>
      <Typography variant="h4">Orders</Typography>
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
