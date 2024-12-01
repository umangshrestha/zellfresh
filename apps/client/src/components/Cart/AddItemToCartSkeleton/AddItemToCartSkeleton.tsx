import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Drawer from '@mui/material/Drawer';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Skeleton from '@mui/material/Skeleton';
import Toolbar from '@mui/material/Toolbar';
import { AddItemTOCartSkeletonProps } from './AddItemToCartSkeleton.types.ts';

export const AddItemToCartSkeleton = ({
  open,
  onClose,
}: AddItemTOCartSkeletonProps) => (
  <Drawer anchor="right" open={open} onClose={onClose}>
    <Toolbar />
    <Card className="flex flex-col justify-between w-64 m-4" elevation={0}>
      <CardHeader
        sx={{ pt: 0, pb: 0, pl: 0 }}
        avatar={<Skeleton variant="rectangular" width={80} height={80} />}
        title={<Skeleton width="60%" />}
        subheader={<Skeleton width="80%" />}
        action={<Skeleton width="60px" />}
      />
      <CardActions
        disableSpacing
        sx={{
          mt: 'auto',
        }}
      >
        <FormControl variant="standard" fullWidth>
          <InputLabel id="product-quantity-label">
            <Skeleton width="60%" />
          </InputLabel>
          <Skeleton width="100%" height={40} />
          <Skeleton width="100%" height={40} />
          <br />
          <Skeleton width="100%" height={40} />
          <Skeleton width="100%" height={40} />
        </FormControl>
      </CardActions>
    </Card>
  </Drawer>
);
