import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import MenuCloseIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
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
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { APP_NAME } from '../../config';
import { SUPPORTED_PRODUCTS } from '../../config/products.ts';
import Account from '../Account';
import CartIcon from '../Cart/CartIcon';
import ErrorBoundary from '../ErrorBoundary';
import Footer from '../Footer';
import Notification from '../Notification';
import { useProductFilter } from '../Product/ProductFilter';
import ThemeToggle from '../ThemeToggle';

export const Layout = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(true);
  const location = useLocation();
  const { productFilter, updateProductFilter } = useProductFilter();
  const pathNames = location.pathname.split('/').filter((x) => x);

  return (
    <Box className="flex flex-col min-h-3">
      <AppBar
        position="sticky"
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" color="inherit" underline="none">
              {APP_NAME}
            </Link>
          </Typography>
          <ThemeToggle />
          <ErrorBoundary>
            <CartIcon onClick={() => navigate('/cart')} />
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
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Product" />
            {productsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={productsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {SUPPORTED_PRODUCTS.map((product) => (
                <ListItemButton
                  sx={{ pl: 4 }}
                  key={product.name}
                  disabled={productFilter?.category === product.name}
                  onClick={() => {
                    setDrawerOpen(false);
                    updateProductFilter({ category: product.name });
                  }}
                >
                  <ListItemIcon>{product.icon}</ListItemIcon>
                  <ListItemText primary={product.name} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>
      </Drawer>
      <Paper className="min-h-screen p-4">
        <Breadcrumbs
          className="p-4"
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            underline="hover"
            key="1"
            color="inherit"
            href="/"
            onClick={() => navigate('/products')}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          </Link>
          {pathNames.map((name, index) => (
            <Link
              underline="hover"
              key={index + 2}
              color="inherit"
              href="/"
              onClick={() =>
                navigate(`/${pathNames.slice(0, index + 1).join('/')}`)
              }
            >
              {name}
            </Link>
          ))}
        </Breadcrumbs>
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
