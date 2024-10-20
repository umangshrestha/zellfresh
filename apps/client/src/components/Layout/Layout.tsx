import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { APP_NAME } from '../../config';
import Account from '../Account';
import CartIcon from '../Cart/CartIcon';
import ErrorBoundary from '../ErrorBoundary';
import Footer from '../Footer';
import Notification from '../Notification';
import ThemeToggle from '../ThemeToggle';

export const Layout = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar disableGutters className="pl-4 pr-4">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" color="inherit" underline="none">
              {APP_NAME}
            </Link>
          </Typography>
          <ThemeToggle />
          <CartIcon />
          <Account />
        </Toolbar>
      </AppBar>
      <Paper className="min-h-screen">
        <ErrorBoundary>
          <Suspense fallback={<CircularProgress />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
        <Notification />
      </Paper>
      <Footer />
    </Box>
  );
};
