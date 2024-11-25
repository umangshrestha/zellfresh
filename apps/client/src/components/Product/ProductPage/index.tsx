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
      <div>
        <div className="flex flex-wrap justify-center gap-4 p-4 flex-start">
          <ProductPageComponent {...cartProps} {...productProps} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
