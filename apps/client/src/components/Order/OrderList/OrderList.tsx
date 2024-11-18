import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import Badge from '../../Badge';
import Typography from '@mui/material/Typography';
import { OrderListProps } from './OrderList.types';
import OrderItemSkeleton from '../OrderItemSkelton';
import { OrderItemType, OrderItem } from '../OrderItem';
import Button from '@mui/material/Button';
import { CartItem } from '../../../__generated__/types';
import * as React from 'react';
import Accordion, { AccordionSlots } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DeliveryStatus } from '../../../__generated__/types';
import Fade from '@mui/material/Fade';

export const OrderList=({data, loading}: OrderListProps) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
      setExpanded((prevExpanded) => !prevExpanded);
  };

      console.log(data, loading);
      if (loading)
        return (
          <List>
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <ListItem key={index}>
                  <OrderItemSkeleton />
                </ListItem>
              ))}
          </List>
        );

      const orderItem =
        (data.items?.map((item: CartItem) => ({
          ...item.product,
          quantity: item.quantity,
        })) as OrderItemType[]) || [];

      const {
          apt,
          street,
          city,
          state,
          country,
          zip,
          additionalInfo,
        } =  data.shippingAddress;
      const formattedAddress = [
        apt ? `Apt: ${apt}` : null, 
        street,
        city,
        state,
        country,
        zip ? `ZIP: ${zip}` : null, 
        additionalInfo ? `Info: ${additionalInfo}` : null, 
      ]
        .filter(Boolean) 
        .join(', '); 

      return (
        <Box className="flex flex-col justify-between max-w-xl w-full">
          <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        slots={{ transition: Fade as AccordionSlots['transition'] }}
        slotProps={{ transition: { timeout: 400 } }}
        sx={[
          expanded
            ? {
                '& .MuiAccordion-region': {
                  height: 'auto',
                },
                '& .MuiAccordionDetails-root': {
                  display: 'block',
                },
              }
            : {
                '& .MuiAccordion-region': {
                  height: 0,
                },
                '& .MuiAccordionDetails-root': {
                  display: 'none',
                },
              },
        ]}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
      <Badge badgeText={data.deliveryStatus} />
 
        <List>
          {orderItem.map((product: OrderItemType) => (
            <ListItem key={product.productId}>
              <OrderItem {...product}  />
            </ListItem>
          ))}
        </List>
        </AccordionSummary>
        <AccordionDetails>
        <Typography sx={{ mt: 1 }} color="textSecondary">
        orderId: {data.orderId}
        </Typography>
        <Typography sx={{ mt: 1 }} color="textSecondary">
        Created at: {data.createdAt}
        </Typography>
        <Typography sx={{ mt: 1 }} color="textSecondary">
        Last Updated: {data.updatedAt}
        </Typography>
        <Typography sx={{ mt: 1 }} color="textSecondary">
        Address: {formattedAddress}
        </Typography>
        {!(data.deliveryStatus === DeliveryStatus.Cancelled ||
          data.deliveryStatus === DeliveryStatus.Completed ||
          data.deliveryStatus === DeliveryStatus.Delivered) && (
          <>
            <Button color="error">Cancel</Button>
            <Button color="error">Track Order</Button>
          </>
        )}
        </AccordionDetails>
        </Accordion>
        
        </Box>
      );

}