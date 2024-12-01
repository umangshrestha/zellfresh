import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import CartItemSkeleton from '../../CartItemSkeleton';

export const CartLoadingPage = () => (
  <Box className="flex flex-col gap-4 max-w-xl mx-auto pt-3">
    <Typography variant="h5">Cart Page</Typography>
    <List>
      {Array(2)
        .fill(0)
        .map((_, index) => (
          <CartItemSkeleton key={index} />
        ))}
    </List>
    <Box className="flex justify-end gap-4 pb-10">
      Sub total: <Skeleton variant="text" width={50} />
    </Box>
    <Button variant="contained" color="warning" className="w-full" disabled>
      <Skeleton variant="rectangular" width="100%" height={20} />
    </Button>
  </Box>
);
