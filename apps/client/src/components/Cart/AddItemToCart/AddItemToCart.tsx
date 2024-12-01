import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useAddItemToCart } from './AddItemToCart.hooks.tsx';
import Drawer from '@mui/material/Drawer';



export const AddItemToCart = ({
  availableQuantity,
  limitPerTransaction,
  onAddItemToCart,
  getProductCount,
  ...key
}) => {
  const {productId, setProductId} = useAddItemToCart();

  const currentQuantity = getProductCount(key);
  const isError = currentQuantity > availableQuantity;
  return (
    <Drawer anchor="right" open={!!productId} onClose={() => setProductId(null)}>
    <FormControl variant="standard" fullWidth>
      <InputLabel id="product-quantity-label">Quantity</InputLabel>
      <Select
        value={currentQuantity.toString()}
        onChange={(e) => onAddItemToCart(key, +e.target.value)}
        variant="standard"
        error={isError}
        labelId="product-quantity-label"
      >
        {Array.from(
          { length: Math.min(limitPerTransaction + 1, availableQuantity + 1) },
          (_, i) => (
            <MenuItem key={i} value={i.toString()}>
              {i}
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
        <div className="text-red-500 text-sm">Please update the quantity.</div>
      )}
    </FormControl>
    </Drawer>
  );
};
