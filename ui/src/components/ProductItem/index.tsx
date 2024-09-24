import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ProductType as ProductProps } from "./types";
import Badge from "../Badge";
import Viel from "../Viel";
import Card from "@mui/material/Card";

export default function Product({
  name,
  description,
  price,
  imageUrl,
  quantity,
  badgeText,
}: ProductProps) {
  const imageSize = 300;
  const isProductAvailable = quantity > 0;
  badgeText = isProductAvailable ? badgeText : "Out of Stock";
  return (
    <Viel enable={!isProductAvailable}>
      <Card className="h-full w-64">
        <Badge badgeText={badgeText} />
        <CardMedia
          component="img"
          title={name}
          src={imageUrl}
          alt={name}
          className="h-48 object-full"
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
          <Button size="small" disabled={!isProductAvailable}>
            Buy
          </Button>
          <span className="flex-1" />
          <Button size="small" disabled={!isProductAvailable}>
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Viel>
  );
}
