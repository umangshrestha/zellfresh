import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography';
import { useQuery } from '@apollo/client';
import {OrderList} from '../../components/Order/OrderList';
import { gql } from '@apollo/client';
import { Order, PaginatedOrder } from '../../__generated__/types';



export const OrderPage=()=>{

    const ORDER_QUERY = gql`
  query {
    orders{
    items{
        createdAt
        deliveryStatus
        orderId
        updatedAt
        shippingAddress{
          apt
          street
          city
          state
          country
          zip
          additionalInfo
        }
        items{
        quantity
        product{
            productId
            name
            price
            imageUrl
            description
            unit
            category
        }
        }
    } 
    }
    }
`

    const {data, loading} = useQuery(ORDER_QUERY)


    console.log(data,loading);
    if (!loading && !data) {
        return <div>Empty</div>;
      }

    return (
        <Box>
            <Typography variant="h4">Orders</Typography>
            <List>
            {data?.orders?.items?.map((order: Order) => (
                <ListItem key={order.orderId}>
                <OrderList data={order} loading={loading} />
                </ListItem>

            ))}       
            </List>

        </Box>
    )
   
}