import { useQuery } from '@apollo/client';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import MenuItem from '@mui/material/MenuItem';
import Rating from '@mui/material/Rating';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Badge from '../../Badge';
import { CART_ITEM } from '../../Cart/CartPage/CartPage.queries';
import { useNotification } from '../../Notification';
import Viel from '../../Viel';
import { ProductAddItemProps, ProductProps } from './ProductItem.types';

export const ProductAddItem = ({
  productId,
  availableQuantity,
  limitPerTransaction,
  onClick,
}: ProductAddItemProps) => {
  const { setNotification } = useNotification();

  const { data, loading, error } = useQuery(CART_ITEM, {
    variables: {
      productId,
    },
  });

  useEffect(() => {
    if (error) {
      setNotification({
        message: error.message,
        severity: 'error',
      });
    }
  }, [error, setNotification]);
  if (loading) return <p>Loading...</p>;

  return (
    <Select
      value={data.cartItem.quantity.toString()}
      onChange={(e) => onClick(productId, +e.target.value)}
      className="w-full h-12"
    >
      {Array.from(
        { length: Math.min(limitPerTransaction + 1, availableQuantity) },
        (_, i) => (
          <MenuItem key={i} value={i.toString()}>
            {i}
          </MenuItem>
        ),
      )}
    </Select>
  );
};

export const ProductItem = ({
  productId,
  name,
  description,
  price,
  imageUrl,
  limitPerTransaction,
  availableQuantity,
  rating,
  badgeText,
  onClick,
}: ProductProps) => {
  const [isAddedToCartClicked, setIsAddedToCartClicked] = useState(false);

  const onChange = (productId: string, quantity: number) => {};

  const handleIsAddedToCartClicked = () => {
    setIsAddedToCartClicked(true);
  };

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
              {...{
                productId,
                availableQuantity,
                limitPerTransaction,
                onClick,
              }}
            />
          )}
        </CardActions>
      </Card>
    </Viel>
  );
};
