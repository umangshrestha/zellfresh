import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Badge from '../../Badge';
import Viel from '../../Viel';
import ProductAddItem from '../ProductAddItem';
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
  limitPerTransaction,
  onAddItemToCart,
  getProductCount,
  ...key
}: ProductProps) => {
  const [isAddedToCartClicked, setIsAddedToCartClicked] = useState(false);

  const handleIsAddedToCartClicked = () => {
    setIsAddedToCartClicked(true);
  };

  const isProductAvailable = availableQuantity > 0;
  badgeText = isProductAvailable ? badgeText : 'Out of Stock';

  useEffect(() => {
    if (isAddedToCartClicked) return;
    setIsAddedToCartClicked(getProductCount(key) > 0);
  }, [getProductCount]);

  return (
    <Viel enable={!isProductAvailable}>
      <Card className="h-full w-64 max-w-xs flex flex-col">
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
          <Rating name="read-only" value={rating} precision={0.5} readOnly />
        </CardContent>
        <CardActions disableSpacing sx={{ mt: 'auto' }}>
          {!isAddedToCartClicked ? (
            <Button
              className="w-full"
              size="large"
              disabled={!isProductAvailable}
              color="error"
              variant="contained"
              onClick={() => handleIsAddedToCartClicked()}
            >
              Add to Cart
            </Button>
          ) : (
            <ProductAddItem
              availableQuantity={availableQuantity}
              limitPerTransaction={limitPerTransaction}
              {...key}
              onAddItemToCart={onAddItemToCart}
              getProductCount={getProductCount}
            />
          )}
        </CardActions>
      </Card>
    </Viel>
  );
};
