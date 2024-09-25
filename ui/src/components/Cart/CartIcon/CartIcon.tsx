import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { CartIconProps } from "./CartIcon.types";

export const CartIcon = ({ count, onClick }: CartIconProps) => {
  return (
    <IconButton onClick={onClick}>
      <Badge badgeContent={count} color="secondary">
        <ShoppingCartIcon color="info" />
      </Badge>
    </IconButton>
  );
};
