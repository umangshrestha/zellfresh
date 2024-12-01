import { useMutation, useQuery } from '@apollo/client';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Drawer from '@mui/material/Drawer';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { useNotification } from '../../Notification';
import AddItemToCartSkeleton from '../AddItemToCartSkeleton';
import { CARTS_QUERY } from '../Cart.queries.ts';
import {
  ADD_ITEM_TO_CART_MUTATION,
  CART_ITEM_QUERY,
} from './AddItemToCart.queries.ts';
import { AddItemToCartProps } from './AddItemToCart.types.ts';

export const AddItemToCart = ({ productId, onClose }: AddItemToCartProps) => {
  const { setNotification } = useNotification();
  const { data, loading, error } = useQuery(CART_ITEM_QUERY, {
    variables: { productId },
  });
  const [addItemToCart] = useMutation(ADD_ITEM_TO_CART_MUTATION, {
    refetchQueries: [{ query: CARTS_QUERY }, { query: CART_ITEM_QUERY }],
    onCompleted: () => {
      setNotification({
        message: 'Cart updated',
        severity: 'success',
      });
    },
  });

  const onAddItemToCart = (productId: string, quantity: number) => {
    addItemToCart({ variables: { productId, quantity } }).then(() => {
      if (quantity === 0) {
        onClose();
      }
    });
  };
  if (loading)
    return <AddItemToCartSkeleton productId={productId} onClose={onClose} />;
  if (!data || error) {
    return <div>{error ? error.message : 'No data'}</div>;
  }

  const currentQuantity = data.cartItem.quantity;
  if (currentQuantity === 0 && productId) {
    onAddItemToCart(productId, 1);
  }
  const {
    name = 'NA',
    description = '',
    imageUrl,
    price = 0,
    limitPerTransaction = 0,
    availableQuantity = 0,
  } = data.product || {};
  const isError = currentQuantity > availableQuantity;
  return (
    <Drawer anchor="right" open={!!productId} onClose={onClose}>
      <Toolbar />

      <Card
        className="flex flex-col justify-between max-w-xs m-4"
        elevation={0}
      >
        <CardHeader
          sx={{ pt: 0, pb: 0, pl: 0 }}
          avatar={
            <Avatar
              alt={name}
              src={imageUrl}
              variant="square"
              sx={{ width: 80, height: 80 }}
            />
          }
          title={
            <Typography variant="h6" className="pt-6">
              {name}
            </Typography>
          }
          subheader={
            <Typography variant="subtitle2" color="textSecondary">
              {description}
            </Typography>
          }
          action={
            <Typography variant="h6" className="text-red-500 pt-6">
              Rs. {price * currentQuantity}
            </Typography>
          }
        />
        <CardActions
          disableSpacing
          sx={{
            mt: 'auto',
          }}
        >
          <FormControl variant="standard" fullWidth>
            <InputLabel id="product-quantity-label">Quantity</InputLabel>
            <Select
              value={currentQuantity.toString()}
              onChange={(e) => onAddItemToCart(productId, +e.target.value)}
              variant="standard"
              error={isError}
              labelId="product-quantity-label"
            >
              {Array.from(
                {
                  length: Math.min(
                    limitPerTransaction + 1,
                    availableQuantity + 1,
                  ),
                },
                (_, i) => (
                  <MenuItem key={i} value={i.toString()}>
                    {i} {i === 0 ? ' (remove)' : ''}
                  </MenuItem>
                ),
              )}
              {isError && (
                <MenuItem value={currentQuantity.toString()} disabled>
                  {currentQuantity}
                </MenuItem>
              )}
            </Select>
            {isError && (
              <div className="text-red-500 text-sm">
                Please update the quantity.
              </div>
            )}
            <br />
            <Button
              component={RouterLink}
              to="/cart"
              onClick={onClose}
              variant="contained"
              color="primary"
            >
              <AddShoppingCartIcon />
              View Cart and Checkout
            </Button>
            <Button onClick={onClose}>Continue Shopping</Button>
          </FormControl>
        </CardActions>
      </Card>
    </Drawer>
  );
};
