import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Skeleton from '@mui/material/Skeleton';

export const CartItemSkeleton = () => {
  return (
    <Card className="flex flex-col justify-between max-w-xl w-full">
      <Skeleton variant="text" width={80} height={30} />
      <CardHeader
        avatar={<Skeleton variant="rectangular" width={100} height={100} />}
        title={<Skeleton variant="text" width="50%" height={28} />}
        subheader={<Skeleton variant="text" width="70%" height={24} />}
        action={
          <IconButton color="error" disabled>
            <DeleteIcon />
          </IconButton>
        }
      />
      <Divider />
      <CardActions className="flex justify-between">
        <Skeleton variant="text" width={60} height={28} />
        <IconButton disabled>
          <ClearIcon />
        </IconButton>
        <Select value={1} disabled>
          <MenuItem value={1}>
            <Skeleton variant="text" width={20} />
          </MenuItem>
        </Select>
        <Typography variant="body2" color="textSecondary">
          =
        </Typography>
        <Skeleton variant="text" width={60} height={28} />
      </CardActions>
    </Card>
  );
};
