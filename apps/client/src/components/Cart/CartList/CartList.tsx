import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CartItem, { CartItemType } from '../CartItem';
import CartItemSkeleton from '../CartItemSkeleton';
import { CartListProps } from './CartList.types';

export const CartList = ({ data, loading, ...functions }: CartListProps) => {
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
      {data.map((product: CartItemType) => (
        <ListItem key={product.productId}>
          <CartItem {...product} {...functions} />
        </ListItem>
      ))}
    </List>
  );
};
