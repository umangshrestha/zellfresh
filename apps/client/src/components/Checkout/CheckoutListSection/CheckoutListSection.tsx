import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import CartItem, { CartItemProps } from '../../Cart/CartItem';
import { CheckoutListSectionProps } from './CheckoutItem.types.tsx';

export const CheckoutListSection = ({ cart }: CheckoutListSectionProps) => (
  <section>
    <div className="flex justify-between gap-4">
      <Typography variant="h6">Cart Items</Typography>
      <Button component={RouterLink} to="/cart" variant="outlined">
        Edit
      </Button>
    </div>
    <List>
      {cart.items.map((props, i) => {
        if (!props?.product) return <React.Fragment />;
        const newProps: CartItemProps = {
          ...props,
          productId: '',
          product: {
            ...(props.product || {}),
            limitPerTransaction: 0,
          },
        };
        return <CartItem key={`${props.__typename}_${i}`} {...newProps} />;
      })}
    </List>
  </section>
);
