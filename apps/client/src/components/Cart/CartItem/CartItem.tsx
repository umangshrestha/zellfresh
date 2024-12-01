import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { CartItemProps } from './CartItem.types';

export const CartItem = ({
  quantity,
  productId,
  product,
  onAddItemToCart,
}: CartItemProps) => {
  const {
    name,
    unit,
    price,
    imageUrl,
    availableQuantity,
    limitPerTransaction,
    description,
  } = product || {
    price: 0,
    imageUrl: '',
    limitPerTransaction: 0,
    availableQuantity: 0,
    name: '',
    description: '',
    unit: '',
  };

  return (
    <ListItem className="max-w-xl w-full flex gap-4">
      <ListItemAvatar>
        <Avatar
          alt={name}
          src={imageUrl}
          variant="square"
          sx={{ width: 80, height: 80 }}
        />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={
          <Typography variant="subtitle2" color="textSecondary">
            {description}
            <br />
            Rs. {price} / {unit}
            <br />
            {quantity > availableQuantity && (
              <span className="text-red-500">
                Only {availableQuantity} available. Please reduce the quantity.
              </span>
            )}
          </Typography>
        }
      />
      {onAddItemToCart && (
        <FormControl variant="standard" className="pt-3">
          <Select
            value={quantity.toString()}
            onChange={(e) => onAddItemToCart(productId, +e.target.value)}
            variant="standard"
            error={quantity > availableQuantity}
            labelId="cart-quantity-label"
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
          </Select>
        </FormControl>
      )}
      <Typography variant="h6" color="error" className="pt-3">
        Rs. {price * quantity}
      </Typography>
    </ListItem>
  );
};
