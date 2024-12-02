import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Badge from '../../Badge';
import Veil from '../../Veil.tsx';
import { ProductProps } from './ProductItem.types';

export const ProductItem = ({
  name,
  unit,
  description,
  price,
  imageUrl,
  availableQuantity,
  rating,
  badgeText,
  onAddItemToCart,
  productId,
}: ProductProps) => {
  const isProductAvailable = availableQuantity > 0;
  if (availableQuantity <= 0) badgeText = 'Out of Stock';
  else if (availableQuantity < 10) badgeText = 'Limited Stock';

  return (
    <Veil enable={!isProductAvailable}>
      <Card className="h-full w-64 max-w-xs flex flex-col border-0 shadow-none">
        <Badge badgeText={badgeText} />
        <CardMedia
          component="img"
          title={name}
          image={imageUrl}
          alt={name}
          className="h-48 w-48 object-cover"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="break-words max-w-full"
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            component="div"
            className="break-words max-w-full text-gray-500"
          >
            {description}
          </Typography>
          <Typography variant="h6" className="text-red-500">
            Rs. {price}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {unit}
          </Typography>
          <Rating value={rating?.rating} precision={0.5} readOnly />
          <Typography
            variant="caption"
            color="textSecondary"
          >{`(${rating?.count})`}</Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ mt: 'auto' }}>
          <Button
            className="w-full"
            size="large"
            disabled={!isProductAvailable}
            color="error"
            variant="contained"
            onClick={() => onAddItemToCart(productId)}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Veil>
  );
};
