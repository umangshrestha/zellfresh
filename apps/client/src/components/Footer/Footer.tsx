import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import {
  ADDRESS,
  APP_NAME,
  CURRENT_YEAR,
  EMAIL,
  GOOGLE_MAP_URL,
  PHONE_NUMBER,
  SHOP_HOURS,
} from '../../config';
import { SOCIAL_MEDIA_HANDLES } from '../../config/social';
import AvailabilityBanner from '../Banner.tsx';

export const Footer = () => (
  <footer>
    <div className="flex row gap-4 justify-between p-4 flex-wrap">
      <section>
        <iframe
          src={GOOGLE_MAP_URL}
          width="450"
          height="250"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps"
        ></iframe>
      </section>
      <address>
        <span className="font-bold text-lg">{APP_NAME}</span>
        <br />
        {ADDRESS.street},<br />
        {ADDRESS.landmark},<br />
        {ADDRESS.city}, {ADDRESS.state},<br />
        {ADDRESS.country} - {ADDRESS.zip}
      </address>
      <section>
        <span className="font-bold text-lg">Shop hours</span>
        <Box className="flex flex-col">
          {SHOP_HOURS.map((shopHour) => (
            <Box key={shopHour.day} className="flex justify-between">
              <span>{shopHour.day}</span>
              <span>{shopHour.time}</span>
            </Box>
          ))}
        </Box>
      </section>
      <section className="flex flex-col">
        <span className="font-bold text-lg">Information</span>
        <Link component={RouterLink} to="/terms-and-conditions">
          Terms of Service
        </Link>
        <Link component={RouterLink} to="/privacy-policy">
          Privacy Policy
        </Link>
      </section>
      <section className="flex flex-col text-center">
        <span className="font-bold text-lg">Contact us</span>
        <Link href={`tel:+91${PHONE_NUMBER}`} underline="none">
          <CallIcon /> {PHONE_NUMBER}
        </Link>
        <Link href={`mailto:${EMAIL}`} underline="none">
          <EmailIcon /> {EMAIL}
        </Link>
        <br />
        <span className="font-bold text-lg">Follow us</span>
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
      </section>
    </div>

    <p className="w-full text-center">
      © {CURRENT_YEAR} {APP_NAME}. All rights reserved.
    </p>
    <AvailabilityBanner />
  </footer>
);
