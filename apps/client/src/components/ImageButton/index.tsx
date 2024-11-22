import Typography from '@mui/material/Typography';
import {
  ImageBackdrop,
  ImageCenterButton,
  ImageMarked,
  ImageSrc,
} from './ImageButton.tsx';
import { ImageButtonProps } from './ImageButton.types.ts';

const ImageButton = ({
  imageUrl,
  name,
  width = '33%',
  onClick,
}: ImageButtonProps) => (
  <ImageCenterButton
    focusRipple
    key={name}
    onClick={() => onClick()}
    style={{ width }}
  >
    <ImageSrc style={{ backgroundImage: `url(${imageUrl})` }} />
    <ImageBackdrop className="MuiImageBackdrop-root" />
    <span className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center text-white">
      <Typography
        component="span"
        variant="subtitle1"
        color="inherit"
        className="relative p-4 pt-2 pb-1"
      >
        {name.toUpperCase()}
        <ImageMarked className="MuiImageMarked-root" />
      </Typography>
    </span>
  </ImageCenterButton>
);

export default ImageButton;
