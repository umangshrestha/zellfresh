import Typography from '@mui/material/Typography';
import {
  ImageBackdrop,
  ImageCenterButton,
  ImageMarked,
  ImageSpan,
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
    <ImageSpan>
      <Typography
        component="span"
        variant="subtitle1"
        color="inherit"
        sx={(theme) => ({
          position: 'relative',
          p: 4,
          pt: 2,
          pb: `calc(${theme.spacing(1)} + 6px)`,
        })}
      >
        {name.toUpperCase()}
        <ImageMarked className="MuiImageMarked-root" />
      </Typography>
    </ImageSpan>
  </ImageCenterButton>
);

export default ImageButton;
