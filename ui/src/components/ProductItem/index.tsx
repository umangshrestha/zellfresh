import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ProductType as ProductProps } from "./types";
import Badge from "../Badge";
import Viel from "../Viel";
import Card from "@mui/material/Card";
import Rating from "@mui/material/Rating";

const Product = ({
  name,
  description,
  price,
  imageUrl,
  quantity,
  rating,
  badgeText,
}: ProductProps) => {
  console.log(rating);
  const imageSize = "192px";
  const isProductAvailable = quantity > 0;
  badgeText = isProductAvailable ? badgeText : "Out of Stock";
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
          width={imageSize}
          height={imageSize}
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
        <span className="flex-1 auto" />
        <CardActions>
          <Rating name="read-only" value={rating} precision={0.5} readOnly />
          <Button
            size="small"
            disabled={!isProductAvailable}
            color="error"
            variant="contained"
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Viel>
  );
};

export default Product;
