import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Banner() {
  return (
    <Box
      sx={{
        backgroundColor: '#f50057',
        color: '#ffffff',
        py: 2,
        textAlign: 'center',
      }}
    >
      <Typography variant="h6">
        Currently only available in Bangalore
      </Typography>
    </Box>
  );
}
