import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export const MarkdownSkeleton = () => (
  <Box sx={{ p: 2 }}>
    <Skeleton variant="rectangular" width={160} />
    <br />
    <Skeleton variant="text" width={60} />
    <Skeleton variant="text" />
    <Skeleton variant="text" />
    <br />

    <Skeleton variant="text" width={60} />
    <Skeleton variant="text" />
    <Skeleton variant="text" />
  </Box>
);
