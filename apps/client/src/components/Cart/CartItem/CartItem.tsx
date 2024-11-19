import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Badge from '../../Badge';
import ProductAddItem from '../../Product/ProductAddItem';
import { CartItemProps } from './CartItem.types';

export const CartItem = ({
  quantity,
  onAddItemToCart,
  getProductCount,
  product,
}: CartItemProps) => {
  const {
    name,
    unit,
    price,
    imageUrl,
    availableQuantity,
    limitPerTransaction,
    description,
    productId,
  } = product || {
    productId: '',
    price: 0,
    imageUrl: '',
    availableQuantity: 0,
    limitPerTransaction: 0,
    name: '',
    description: '',
    unit: '',
  };
  const totalPrice = price * quantity;
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
      <CardActions className="flex flex-row">
        <Box className="flex-1" />
        <ProductAddItem
          productId={productId}
          availableQuantity={availableQuantity}
          limitPerTransaction={limitPerTransaction}
          onAddItemToCart={onAddItemToCart}
          getProductCount={getProductCount}
        />
        <Button color="error" onClick={() => onAddItemToCart({ productId }, 0)}>
          delete
        </Button>
      </CardActions>
    </Card>
  );
};
