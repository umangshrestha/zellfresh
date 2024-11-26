import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { LoadingButtonProps } from './LoadingButton.types.ts';

export const LoadingButton = (props: LoadingButtonProps) => (
  <Button {...props} disabled={props.loading || props.disabled}>
    {props.loading ? <CircularProgress /> : props.children}
  </Button>
);
