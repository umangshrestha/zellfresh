import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Skeleton from '@mui/material/Skeleton';
import EmptyPage from '../../EmptyPage';
import CartItem, { CartItemType } from '../CartItem';
import CartItemSkeleton from '../CartItemSkeleton';
import { CartListProps } from './CartList.types';

export const CartList = ({
  data,
  loading,
  onAddItemToCart,
  onEmptyStateClicked,
  getProductCount,
}: CartListProps) => {
  if (loading) {
    return (
      <Box justifyContent="space-around" sx={{ maxWidth: '100%', padding: 2 }}>
        <List>
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <ListItem key={index}>
                <CartItemSkeleton />
              </ListItem>
            ))}
        </List>
        <Skeleton variant="rectangular" height={40} />
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <EmptyPage
        title="Your cart is empty"
        description={[
          'You have no items in your cart',
          'Start adding items to your cart by clicking the button below',
        ]}
        buttonText="Add items"
        image="/empty-cart.png"
        alt="Empty cart"
        onClick={onEmptyStateClicked}
      />
    );
  }

  const totalPrice = data.reduce(
    (acc: number, product: CartItemType) => acc + product.price * product.availableQuantity,
    0,
  );

  return (
    <Box justifyContent="space-around" sx={{ maxWidth: '100%', padding: 2 }}>
      <Box sx={{ padding: 2 }}>
        <List>
          {data.map((product: CartItemType) => (
            <ListItem key={product.productId}>
              <CartItem
                {...product}
                onAddItemToCart={onAddItemToCart}
                getProductCount={getProductCount}
              />
            </ListItem>
          ))}
        </List>
        <Box sx={{ padding: 2 }}>
          Total: {totalPrice}
        </Box>
      </Box>
    </Box>
  );
};
