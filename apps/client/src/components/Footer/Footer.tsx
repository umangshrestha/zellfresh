import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { APP_NAME, CURRENT_YEAR } from '../../config';
import { SOCIAL_MEDIA_HANDLES } from '../../config/social';

export const Footer = () => (
  <Box
    component="footer"
    sx={{
      py: 3,
      px: 2,
      textAlign: 'center',
      borderTop: '1px solid #e7e7e7',
    }}
  >
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
);
