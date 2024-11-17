import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import Badge from '../../Badge';
import Typography from '@mui/material/Typography';
import {OrderItem, OrderItemType } from '../OrderItem';

import { OrderListProps } from './OrderList.types';

export const OrderList=(data: OrderListProps) => {


      return (
        <Box className="flex flex-col justify-between max-w-xl w-full">
      <Badge badgeText={data.deliveryStatus} />
 
        <List>
          {data.item.map((product: OrderItemType) => (
            <ListItem key={product.productId}>
              <OrderItem {...product}  />
            </ListItem>
          ))}
        </List>
        <Typography sx={{ mt: 1 }} color="textSecondary">
            orderId: {data.orderId}
        </Typography>
        <Typography sx={{ mt: 1 }} color="textSecondary">
        Created at: {data.createdAt}
        </Typography>
        <Typography sx={{ mt: 1 }} color="textSecondary">
        Last Updated: {data.updatedAt}
        </Typography>
       
        </Box>
      );

}