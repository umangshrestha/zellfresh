import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Badge from '../../Badge';
import Viel from '../../Viel';
import { ProductProps } from './ProductItem.types';

export const ProductItem = ({
  productId,
  name,
  description,
  price,
  imageUrl,
  availableQuantity,
  rating,
  badgeText,
  onClick,
}: ProductProps) => {
  const isProductAvailable = availableQuantity > 0;
  badgeText = isProductAvailable ? badgeText : 'Out of Stock';
  return (
    <Viel enable={!isProductAvailable}>
      <Card className="h-full w-64 max-w-xs">
        <Badge badgeText={badgeText} />
        <CardMedia
          component="img"
          title={name}
          image={imageUrl}
          alt={name}
          className="h-48 w-48 object-cover"
        />
        <CardContent>
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
          <div className="flex-1" />
        </CardContent>
        <Rating name="read-only" value={rating} precision={0.5} readOnly />

        <span className="flex-1 auto" />
        <CardActions>
          <Button
            className="w-full"
            size="large"
            disabled={!isProductAvailable}
            color="error"
            variant="contained"
            onAbort={() => onClick(productId)}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Viel>
  );
};
