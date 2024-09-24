import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Skeleton from "@mui/material/Skeleton";

const ProductSkeleton = () => (
  <Card className="h-full w-64 max-w-xs">
    <Skeleton variant="rectangular" height={192} /> {/* Skeleton for image */}
    <CardContent>
      <Skeleton height={30} width="80%" /> {/* Skeleton for title */}
      <Skeleton height={20} width="60%" className="mt-2" />{" "}
      {/* Skeleton for description */}
      <Skeleton height={25} width="30%" className="mt-2" />{" "}
      {/* Skeleton for price */}
    </CardContent>
    <CardActions>
      <Skeleton variant="rectangular" width={60} height={36} />{" "}
      {/* Skeleton for button */}
      <Skeleton
        variant="rectangular"
        width={60}
        height={36}
        className="ml-auto"
      />{" "}
      {/* Skeleton for button */}
    </CardActions>
  </Card>
);

export default ProductSkeleton;
