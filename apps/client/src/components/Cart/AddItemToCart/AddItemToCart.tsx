import { useNotification } from '@/components/Notification';
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
import AddItemToCartSkeleton from '../AddItemToCartSkeleton';
import { AddItemToCartProps } from './AddItemToCart.types.ts';

export const AddItemToCart = ({
  quantity,
  productId,
  product,
  onAddItemToCart,
  onClose,
}: AddItemToCartProps) => {
  const { setNotification } = useNotification();
  if (!product) {
    return <AddItemToCartSkeleton open={true} onClose={onClose} />;
  }

  const {
    name = 'NA',
    description = '',
    imageUrl,
    price = 0,
    limitPerTransaction = 0,
    availableQuantity = 0,
  } = product || {};
  const isError = quantity > availableQuantity;
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
              Rs. {price * quantity}
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
              value={quantity.toString()}
              onChange={(e) => {
                onAddItemToCart(productId, +e.target.value).then(() => {
                  setNotification({
                    message: 'Item added to cart',
                    severity: 'success',
                  });
                  if (+e.target.value === 0) {
                    onClose();
                  }
                });
              }}
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
                <MenuItem value={quantity.toString()} disabled>
                  {quantity}
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
