import useMediaQuery from '@mui/material/useMediaQuery';
import { lazy } from 'react';
import { useAddItemToCart } from '../../Cart/AddItemToCart/AddItemToCart.hooks.ts';
import { useProduct } from '../Product.hooks.ts';
import AddItemToCart from '../../Cart/AddItemToCart';

const ProductsPageComponent = lazy(() =>
  import('./ProductsPage.tsx').then((module) => ({
    default: module.ProductsPage,
  })),
);
const ProductFilter = lazy(() => import('../ProductFilter'));

const ProductsPage = () => {
  const isMapping = useMediaQuery('(max-width: 500px)');
  const productProps = useProduct();
  const { setProductId } = useAddItemToCart();
  return (
    <div className={isMapping ? 'flex flex-col' : 'flex'}>
      <ProductFilter />
      <ProductsPageComponent {...productProps} onAddItemToCart={setProductId} />
      <AddItemToCart />
    </div>
  );
};

export default ProductsPage;
