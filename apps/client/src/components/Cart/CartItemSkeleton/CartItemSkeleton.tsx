import FormControl from '@mui/material/FormControl';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

export const CartItemSkeleton = () => {
  return (
    <ListItem className="max-w-xl w-full flex gap-4">
      <ListItemAvatar>
        <Skeleton variant="rectangular" width={80} height={80} />
      </ListItemAvatar>
      <ListItemText
        primary={<Skeleton width="60%" />}
        secondary={
          <>
            <Skeleton width="80%" />
            <Skeleton width="40%" />
            <Skeleton width="30%" />
          </>
        }
      />
      <FormControl variant="standard">
        <Skeleton width={40} />
      </FormControl>
      <Typography variant="h6" className="text-red-500 pt-3">
        <Skeleton width={60} />
      </Typography>
    </ListItem>
  );
};
