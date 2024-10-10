import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Badge from '../../Badge';
import { CartItemProps } from './CartItem.types';

export const CartItem = ({
  id,
  name,
  price,
  imageUrl,
  availableQuantity,
  limitPerTransaction,
  description,
  onChange,
  onRemove,
}: CartItemProps) => {
  const totalPrice = price * availableQuantity;
  const isProductAvailable = availableQuantity > 0;
  const badgeText = !isProductAvailable ? 'Out of Stock' : null;

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
        title={<Typography variant="h6">{name}</Typography>}
        subheader={
          <Typography variant="h6" color="error">
            {description}
          </Typography>
        }
        action={
          <IconButton color="error" onClick={() => onRemove(id)}>
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
        <Select
          value={availableQuantity}
          onChange={(e) => onChange(id, +e.target.value)}
        >
          {!isProductAvailable ? (
            <MenuItem value={0}>0</MenuItem>
          ) : (
            Array.from({ length: limitPerTransaction }, (_, i) => (
              <MenuItem key={i + 1} value={i + 1}>
                {i + 1}
              </MenuItem>
            ))
          )}
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
