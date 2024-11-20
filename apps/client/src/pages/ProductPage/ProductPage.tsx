import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../components/Cart';
import { LIST_PRODUCTS_QUERY } from '../../components/Product/Product.queries.ts';
import { ProductEmptyPage } from '../../components/Product/ProductEmptyPage';
import ProductFilter, {
  useProductFilter,
} from '../../components/Product/ProductFilter';
import ProductList from '../../components/Product/ProductList';

export const ProductPage = memo(() => {
  const navigate = useNavigate();
  const isMapping = useMediaQuery('(max-width: 500px)');
  const { productFilter, resetProductFilter } = useProductFilter();
  const { data, loading, previousData } = useQuery(LIST_PRODUCTS_QUERY, {
    variables: (productFilter || {}) as object,
  });
  const { onAddItemToCart, getProductCount } = useCart();
  const isLoading = loading && !previousData;
  const targetData = loading ? previousData : data;
  const isEmpty = !targetData?.products?.items.length;

  return (
    <Box className={isMapping ? 'flex flex-col' : 'flex'}>
      <ProductFilter />
      {isEmpty ? (
        <ProductEmptyPage
          onClick={() => {
            navigate('/products');
            resetProductFilter();
          }}
        />
      ) : (
        <ProductList
          loading={isLoading}
          data={targetData?.products?.items || []}
          onAddItemToCart={onAddItemToCart}
          getProductCount={getProductCount}
        />
      )}
    </Box>
  );
});
