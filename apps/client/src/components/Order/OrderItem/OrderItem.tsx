import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { OrderItemType as OrderItemProps } from '@repo/api-client';

export const OrderItem = ({ price, quantity, product }: OrderItemProps) => {
  const { name, unit, imageUrl, description } = product || {
    imageUrl: '',
    description: '',
    name: '',
    unit: '',
  };
  return (
    <ListItem className="max-w-xl w-full flex gap-4">
      <ListItemAvatar>
        <Avatar
          alt={name}
          src={imageUrl}
          variant="square"
          sx={{ width: 80, height: 80 }}
        />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={
          <Typography variant="subtitle2" color="textSecondary">
            {description}
            <br />
            Rs. {price} / {unit}
          </Typography>
        }
      />
      <Typography variant="h6" color="textSecondary">
        Rs. {price * quantity}
      </Typography>
    </ListItem>
  );
};
