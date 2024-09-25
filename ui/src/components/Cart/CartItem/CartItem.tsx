import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from '@mui/icons-material/Delete';import Badge from "../../Badge";
import { CartItemProps } from "./CartItem.types";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import ClearIcon from '@mui/icons-material/Clear';import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";


export const CartItem = ({
  name,
  price,
  imageUrl,
  quantity,
  maxQuantity,
  description,
  onChange,
  onRemove,
}: CartItemProps) => {
  const totalPrice = price * quantity;
  const isProductAvailable = quantity > 0;
  const badgeText = isProductAvailable ? "Out of Stock" : null;

  return (
    <Card className="flex flex-col justify-between max-w-xl w-full">
    <Badge badgeText={badgeText} />

    <CardHeader
      avatar={
        <Avatar 
          alt={name} 
          src={imageUrl} 
          variant="square" 
          sx={{ width: 100, height: 100 }} 
        />
      }
      title={
        <Typography variant="h6">
          {name}
        </Typography>
      }
      subheader={
        <Typography variant="h6" color="error">
          {description}
        </Typography>
      }
      action={
        <IconButton color="error" onClick={onRemove}>
          <DeleteIcon />
        </IconButton>
      }
    />

    <Divider />
    <CardActions className="flex justify-between">
      <Typography variant="h6" color="textSecondary">
        Rs. {price}
      </Typography>
      <Typography variant="body2" color="textSecondary">
      <ClearIcon />
      </Typography>
      <Select value={quantity} onChange={(e) => onChange(+e.target.value)}>
        {Array.from({ length: maxQuantity }, (_, i) => (
          <MenuItem key={i + 1} value={i + 1}>
            {i + 1}
          </MenuItem>
        ))}
      </Select>
      <Typography variant="body2" color="textSecondary">
        =
      </Typography>
      <Typography variant="h6" color="error">
        Rs. {totalPrice}
      </Typography>
    </CardActions>
  </Card>
  );
};
