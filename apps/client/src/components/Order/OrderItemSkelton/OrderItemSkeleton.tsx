import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Skeleton from '@mui/material/Skeleton';

export const OrderItemSkeleton = () => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Skeleton
            variant="rectangular"
            width={80}
            height={80}
            animation="wave"
          />
        }
        title={
          <Skeleton variant="text" width="60%" height={24} animation="wave" />
        }
        subheader={
          <>
            <Skeleton variant="text" width="80%" height={20} animation="wave" />
            <Skeleton variant="text" width="50%" height={20} animation="wave" />
          </>
        }
        action={
          <Skeleton variant="text" width={50} height={24} animation="wave" />
        }
      />
    </Card>
  );
};
