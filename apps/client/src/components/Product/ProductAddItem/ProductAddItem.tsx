import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { ProductAddItemProps } from './ProductAddItem.types';

export const ProductAddItem = ({
  productId,
  availableQuantity,
  limitPerTransaction,
  onAddItemToCart,
  getProductCount,
}: ProductAddItemProps) => (
  <FormControl  variant="standard" fullWidth>
    <InputLabel id="product-quantity-label">Quantity</InputLabel>
    <Select
      value={getProductCount(productId).toString()}
      onChange={(e) => onAddItemToCart(productId, +e.target.value)}
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
