import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { useCartIcon } from './CartCount.hooks';
import { CartIconProps } from './CartIcon.types';

export const CartIcon = ({ onClick }: CartIconProps) => {
  const { cartCount } = useCartIcon();
  return (
    <IconButton onClick={onClick}>
      <Badge badgeContent={cartCount} color="error">
        <ShoppingCartIcon className="text-white" />
      </Badge>
    </IconButton>
  );
};
