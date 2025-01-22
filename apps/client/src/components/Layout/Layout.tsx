import Account from '@/components/Account';
import CartIcon from '@/components/Cart/CartIcon';
import { CategoriesCollapsableButton } from '@/components/Categories';
import ErrorBoundary from '@/components/ErrorBoundary';
import Footer from '@/components/Footer';
import Notification from '@/components/Notification';
import ThemeToggle from '@/components/ThemeToggle';
import { APP_NAME } from '@/config';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MenuCloseIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import { Suspense, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from './Breadcrumbs';

export const Layout = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const onClick = (url: string) => {
    navigate(url);
    setDrawerOpen(false);
  };

  return (
    <Box className="flex flex-col min-h-3">
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar disableGutters className="pl-4 pr-4">
          <IconButton
            sx={{ mr: 1 }}
            onClick={() => setDrawerOpen((prev) => !prev)}
            color="inherit"
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
          >
            {drawerOpen ? <MenuOpenIcon /> : <MenuCloseIcon />}
          </IconButton>
          <Button onClick={() => onClick('/')} color="inherit">
            <span className="font-bold">{APP_NAME}</span>
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <ThemeToggle />
          <ErrorBoundary>
            <CartIcon onClick={() => onClick('/cart')} />
          </ErrorBoundary>
          <Suspense fallback={<CircularProgress />}>
            <Account />
          </Suspense>
        </Toolbar>
      </AppBar>
      <Drawer
        className="w-80"
        variant="temporary"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Toolbar />
        <List>
          <CategoriesCollapsableButton />
          <Divider />
          <ListItemButton onClick={() => onClick('/orders')}>
            <ListItemIcon
              sx={{
                minWidth: 'auto',
                mr: 2,
              }}
            >
              <ReceiptLongIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>
        </List>
      </Drawer>
      <Paper className="min-h-screen p-4 mt-12">
        <Breadcrumbs />
        <ErrorBoundary>
          <Suspense fallback={<CircularProgress />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
        <Notification />
      </Paper>
      <div className="relative flex justify-center items-center flex-grow">
        <Button className="absolute" onClick={() => window.scrollTo(0, 0)}>
          <ArrowUpwardIcon />
          Scroll to top
        </Button>
      </div>
      <Footer />
    </Box>
  );
};
