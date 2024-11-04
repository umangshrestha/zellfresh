import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProduct } from '../../components/Product';
import { ProductEmptyPage } from '../../components/Product/ProductEmptyPage';
import ProductFilter, {
  useProductFilter,
} from '../../components/Product/ProductFilter';
import ProductList from '../../components/Product/ProductList';

export const ProductPage = memo(() => {
  const navigate = useNavigate();
  const isMapping = useMediaQuery('(max-width: 500px)');
  const { productFilter, resetProductFilter } = useProductFilter();
  const { data, loading, onAddItemToCart, getProductCount } = useProduct(
    productFilter || {},
  );

  return (
    <Box className={isMapping ? 'flex flex-col' : 'flex'}>
      <ProductFilter />
      {!loading && !data.length ? (
        <ProductEmptyPage
          onClick={() => {
            navigate('/products');
            resetProductFilter();
          }}
        />
      ) : (
        <ProductList
          loading={loading}
          data={data}
          onAddItemToCart={onAddItemToCart}
          getProductCount={getProductCount}
        />
      )}
    </Box>
  );
});
