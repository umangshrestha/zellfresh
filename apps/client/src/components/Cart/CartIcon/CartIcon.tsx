import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { CartIconProps } from './CartIcon.types';

export const CartIcon = ({ count, onClick }: CartIconProps) => (
  <IconButton onClick={onClick}>
    <Badge badgeContent={count} color="secondary">
      <ShoppingCartIcon className="color-white" />
    </Badge>
  </IconButton>
);
