import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Badge from '../../Badge';
import { OrderItemProps } from './OrderItem.types';

export const OrderItem = ({
  price,
  quantity,
  product,
  badgeText,
}: OrderItemProps) => {
  const { name, unit, imageUrl } = product || {
    imageUrl: '',
    name: '',
    unit: '',
  };
  const totalPrice = price * quantity;
  return (
    <Card className="flex flex-col justify-between max-w-xl w-full">
      <Badge badgeText={badgeText || null} />
      <CardHeader
        sx={{ pt: 0, pb: 0, pl: 0 }}
        avatar={
          <Avatar
            alt={name}
            src={imageUrl}
            variant="square"
            sx={{ width: 80, height: 80 }}
          />
        }
        title={<Typography variant="h6">{name}</Typography>}
        subheader={
          <Typography variant="subtitle2" color="textSecondary">
            Rs. {price} * {quantity} / {unit}
          </Typography>
        }
        action={
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{
              mt: 2,
              ml: 2,
            }}
          >
            Rs. {totalPrice}
          </Typography>
        }
      />
    </Card>
  );
};
