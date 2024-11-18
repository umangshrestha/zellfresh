import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuCloseIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Suspense, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { APP_NAME } from '../../config';
import Account from '../Account';
import CartIcon from '../Cart/CartIcon';
import { useCategories } from '../Categories/Categories.hooks.ts';
import ErrorBoundary from '../ErrorBoundary';
import Footer from '../Footer';
import Notification from '../Notification';
import ThemeToggle from '../ThemeToggle';
import { Breadcrumbs } from './Breadcrumbs';

export const Layout = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(true);
  const { data } = useCategories();

  return (
    <Box className="flex flex-col min-h-3">
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar disableGutters className="pl-4 pr-4">
          <IconButton
            onClick={() => setDrawerOpen((prev) => !prev)}
            color="inherit"
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
          >
            {drawerOpen ? <MenuOpenIcon /> : <MenuCloseIcon />}
          </IconButton>
          <Typography
            id="title"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            <Link href="/" color="inherit" underline="none">
              {APP_NAME}
            </Link>
          </Typography>
          <ThemeToggle />
          <ErrorBoundary>
            <CartIcon />
          </ErrorBoundary>
          <Suspense fallback={<CircularProgress />}>
            <Account />
          </Suspense>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Toolbar />
        <List>
          <ListItemButton onClick={() => setProductsOpen((prev) => !prev)}>
            <ListItemIcon
              sx={{
                minWidth: 'auto',
                mr: 2,
              }}
            >
              <DinnerDiningIcon />
            </ListItemIcon>
            <ListItemText
              primary="Product"
              sx={{
                opacity: drawerOpen ? 1 : 0,
              }}
            />
            {productsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={productsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {data.map((product) => (
                <ListItemButton
                  sx={{
                    pl: 4,
                  }}
                  key={product.name}
                  onClick={() => {
                    setDrawerOpen(false);
                    navigate(product.navigateUrl);
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 'auto',
                      mr: 2,
                    }}
                  >
                    {product.icon}
                  </ListItemIcon>
                  <ListItemText primary={product.name} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
          <ListItemButton
            onClick={() => {
              setDrawerOpen(false);
              navigate('/orders');
            }}
          >
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
      <Footer />
    </Box>
  );
};
