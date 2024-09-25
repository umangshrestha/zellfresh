import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";

interface CartIconProps {
  onClick: () => void;
}

export default function CartIcon({ onClick }: CartIconProps) {
  const count = 10;

  return (
    <IconButton onClick={onClick}>
      <Badge badgeContent={count} color="secondary">
        <ShoppingCartIcon color="action" />
      </Badge>
    </IconButton>
  );
}
