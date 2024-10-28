import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { ProductAddItemProps } from './ProductAddItem.types';

export const ProductAddItem = ({
  availableQuantity,
  limitPerTransaction,
  onAddItemToCart,
  getProductCount,
  ...key
}: ProductAddItemProps) => (
  <FormControl variant="standard" fullWidth>
    <InputLabel id="product-quantity-label">Quantity</InputLabel>
    <Select
      value={getProductCount(key).toString()}
      onChange={(e) => onAddItemToCart(key, +e.target.value)}
      variant="standard"
      labelId="product-quantity-label"
    >
      {Array.from(
        { length: Math.min(limitPerTransaction + 1, availableQuantity) },
        (_, i) => (
          <MenuItem key={i} value={i.toString()}>
            {i}
          </MenuItem>
        ),
      )}
    </Select>
  </FormControl>
);
