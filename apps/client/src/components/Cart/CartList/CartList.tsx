import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { CartMutation } from '../Cart.types.ts';
import CartItem from '../CartItem';
import CartItemSkeleton from '../CartItemSkeleton';

export const CartList = ({ data, loading, ...functions }: CartMutation) => {
  if (loading)
    return (
      <List>
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <ListItem key={index}>
              <CartItemSkeleton />
            </ListItem>
          ))}
      </List>
    );
  return (
    <List>
      {data.map((data) => (
        <ListItem key={data.product?.productId}>
          <CartItem {...data} {...functions} />
        </ListItem>
      ))}
    </List>
  );
};
