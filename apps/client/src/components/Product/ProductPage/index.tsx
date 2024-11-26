import useMediaQuery from '@mui/material/useMediaQuery';
import { lazy } from 'react';
import { useCart } from '../../Cart';
import { useProduct } from '../Product.hooks.ts';

const ProductPageComponent = lazy(() =>
  import('./ProductPage.tsx').then((module) => ({
    default: module.ProductPage,
  })),
);
const ProductFilter = lazy(() => import('../ProductFilter'));

const ProductPage = () => {
  const isMapping = useMediaQuery('(max-width: 500px)');
  const cartProps = useCart();
  const productProps = useProduct();

  return (
    <div className={isMapping ? 'flex flex-col' : 'flex'}>
      <ProductFilter />
      <ProductPageComponent {...cartProps} {...productProps} />
    </div>
  );
};

export default ProductPage;
