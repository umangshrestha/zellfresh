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
  <footer style={{ backgroundColor: 'rgb(7, 42, 90)' }} className="text-white py-8">
    <div className="container mx-auto flex flex-wrap gap-8 justify-between px-6">
      <section className="flex-1 min-w-[350px] max-w-[500px]">
        <iframe
          src={GOOGLE_MAP_URL}
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps"
          className="rounded-md shadow-md"
        ></iframe>
      </section>

      <section className="flex-1 min-w-[200px] ml-4 text-center">
        <address className="not-italic text-sm mb-4 leading-6">
          <span className="block font-bold text-lg mb-2">Address</span>
          {ADDRESS.street},<br />
          {ADDRESS.street2},<br />
          {ADDRESS.landmark},<br />
          {ADDRESS.city}, {ADDRESS.state},<br />
          {ADDRESS.country} - {ADDRESS.zip}
        </address>
        <div>
          <span className="block font-bold text-lg mb-2">Shop Hours</span>
          <Box className="flex flex-col items-center gap-1">
            {SHOP_HOURS.map((shopHour) => (
              <Box key={shopHour.day} className="flex justify-start items-center gap-x-4">
                <span>{shopHour.day}</span>
                <span>{shopHour.time}</span>
              </Box>
            ))}
          </Box>
        </div>
      </section>

      <section className="flex-1 min-w-[300px] mx-4 text-center">
        <span className="block font-bold text-lg mb-2">Information</span>
        <Box className="flex flex-col gap-2">
          <Link component={RouterLink} to="/terms-and-conditions" className="text-sm hover:underline">
            Terms of Service
          </Link>
          <Link component={RouterLink} to="/privacy-policy" className="text-sm hover:underline">
            Privacy Policy
          </Link>
        </Box>
      </section>

      <section className="flex-1 min-w-[300px] text-center">
        <span className="block font-bold text-lg mb-2">Contact Us</span>
        <Box className="flex flex-col items-center gap-2">
          <Link href={`tel:+91${PHONE_NUMBER}`} underline="none" className="flex items-center gap-2">
            <CallIcon /> {PHONE_NUMBER}
          </Link>
          <Link href={`mailto:${EMAIL}`} underline="none" className="flex items-center gap-2">
            <EmailIcon /> {EMAIL}
          </Link>
        </Box>
        <div className="mt-4">
          <span className="block font-bold text-lg mb-2">Follow Us</span>
          <Box className="flex justify-center gap-4">
            {SOCIAL_MEDIA_HANDLES.map(({ key, href, icon: Icon }) => (
              <Link
                component={RouterLink}
                key={key}
                to={href}
                target="_blank"
                rel="noopener"
                className="text-white hover:text-gray-400"
              >
                <Icon />
              </Link>
            ))}
          </Box>
        </div>
      </section>
    </div>

    <div className="mt-8 text-center text-sm text-gray-400">
      <p>© {CURRENT_YEAR} {APP_NAME}. All rights reserved.</p>
    </div>
    <AvailabilityBanner />
  </footer>
);
