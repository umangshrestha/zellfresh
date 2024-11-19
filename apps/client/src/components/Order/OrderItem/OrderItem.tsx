import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { OderItemProps } from './OrderItem.types';

export const OrderItem = ({
  price,
  quantity,
  product,
}: OderItemProps) => {
  const { name, unit, imageUrl, description } = product || {
    imageUrl: '',
    name: '',
    description: '',
    unit: '',
  };
  const totalPrice = price * quantity;
  return (
    <Card>
      <CardHeader
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
            {description}
            <br />
            Rs. {price} / {unit}
          </Typography>
        }
        action={
          <Typography sx={{ mt: 1 }} variant="h6" color="textSecondary">
            Rs. {totalPrice}
          </Typography>
        }
      />
    </Card>
  );
};
