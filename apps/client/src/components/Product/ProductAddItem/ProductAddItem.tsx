import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { ProductAddItemProps } from './ProductAddItem.types';

export const ProductAddItem = ({
  productId,
  availableQuantity,
  limitPerTransaction,
  onAddItemToCart,
  getProductCount,
}: ProductAddItemProps) => {
  const onProductChange = (productId: string, quantity: number) => {
    onAddItemToCart(productId, quantity);
  };

  return (
    <Select
      value={getProductCount(productId).toString()}
      onChange={(e) => onProductChange(productId, +e.target.value)}
      className="w-full h-12"
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
  );
};
