import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { LoadingButtonProps } from './LoadingButton.types.ts';

export const LoadingButton = ({
  loading = false,
  disabled = false,
  ...props
}: LoadingButtonProps) => (
  <Button {...props} disabled={loading || disabled}>
    {loading && <CircularProgress />} {props.children}
  </Button>
);
