import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { ADDRESS, APP_NAME, CURRENT_YEAR } from '../../config';
import { SOCIAL_MEDIA_HANDLES } from '../../config/social';
import AvailabilityBanner from '../Banner.tsx';

export const Footer = () => (
  <Box component="footer">
    <Box
      sx={{
        py: 3,
        px: 2,
        bottom: 0,
        width: '100%',
        textAlign: 'center',
        borderTop: '1px solid #e7e7e7',
      }}
    >
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Link href="/" color="inherit" underline="none">
          {APP_NAME}
        </Link>
        <address>
          {ADDRESS.street},<br />
          {ADDRESS.landmark},<br />
          {ADDRESS.city}, {ADDRESS.state},<br />
          {ADDRESS.country} - {ADDRESS.zip}
        </address>
      </Box>
      <Box sx={{ mt: 2 }}>
        <p>Follow us on social media:</p>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {SOCIAL_MEDIA_HANDLES.map(({ key, href, icon: Icon }) => (
          <Link
            key={key}
            href={href}
            target="_blank"
            rel="noopener"
            sx={{ mx: 1 }}
          >
            <Icon />
          </Link>
        ))}
      </Box>
      <Box sx={{ mt: 2 }}>
        <p>
          © {CURRENT_YEAR} {APP_NAME}. All rights reserved.
        </p>
      </Box>
    </Box>
    <AvailabilityBanner />
  </Box>
);
