import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { ADDRESS, APP_NAME, CURRENT_YEAR } from '../../config';
import { SOCIAL_MEDIA_HANDLES } from '../../config/social';
import AvailabilityBanner from '../Banner.tsx';

export const Footer = () => (
  <footer>
    <div className="flex row gap-4 justify-around p-4 flex-wrap">
      <section className="flex flex-col text-center">
        <span className="font-bold text-lg">{APP_NAME}</span>
        <address>
          {ADDRESS.street},<br />
          {ADDRESS.landmark},<br />
          {ADDRESS.city}, {ADDRESS.state},<br />
          {ADDRESS.country} - {ADDRESS.zip}
        </address>
      </section>

      <section className="flex flex-col text-center">
        <span className="font-bold text-lg">Information</span>
        <Link component={RouterLink} to="/terms-and-conditions">
          Terms of Service
        </Link>
        <Link component={RouterLink} to="/privacy-policy">
          Privacy Policy
        </Link>
        <Link component={RouterLink} to="/refund">
          Refund Policy
        </Link>
      </section>
    </div>

    <section className="flex flex-col items-center justify-center p-4">
      <p>Follow us on social media:</p>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {SOCIAL_MEDIA_HANDLES.map(({ key, href, icon: Icon }) => (
          <Link
            component={RouterLink}
            key={key}
            to={href}
            target="_blank"
            rel="noopener"
          >
            <Icon />
          </Link>
        ))}
      </Box>
      <p className="w-full text-center">
        © {CURRENT_YEAR} {APP_NAME}. All rights reserved.
      </p>
    </section>

    <AvailabilityBanner />
  </footer>
);
