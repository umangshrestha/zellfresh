import useMediaQuery from '@mui/material/useMediaQuery';
import { useProduct } from '@repo/api-client';
import { lazy } from 'react';
import AddItemToCart from '../../Cart/AddItemToCart';
import { useAddItemToCart } from '../../Cart/AddItemToCart/AddItemToCart.hooks.ts';
import { useProductFilter } from '../ProductFilter';

const ProductsPageComponent = lazy(() =>
  import('./ProductsPage.tsx').then((module) => ({
    default: module.ProductsPage,
  })),
);
const ProductFilter = lazy(() => import('../ProductFilter'));

const ProductsPage = () => {
  const isMapping = useMediaQuery('(max-width: 500px)');
  const { productFilter } = useProductFilter();
  const productProps = useProduct(productFilter || {});
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
