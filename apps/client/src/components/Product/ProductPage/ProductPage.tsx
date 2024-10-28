import Box from '@mui/material/Box';
import { memo, useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useProduct } from '../Product.hooks';
import { ProductEmptyPage } from '../ProductEmptyPage';
import ProductFilter, { useProductFilter } from '../ProductFilter';
import ProductList from '../ProductList';

export const ProductPage = memo(() => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { productFilter: variables, updateProductFilter } = useProductFilter();
  const { data, loading, onAddItemToCart, getProductCount } =
    useProduct(variables);

  const handleUpdateProductFilter = useCallback(() => {
    updateProductFilter(searchParams);
  }, [updateProductFilter, searchParams]);

  useEffect(() => {
    handleUpdateProductFilter();
  }, [handleUpdateProductFilter]);

  if (!loading && !data.length) {
    return <ProductEmptyPage onClick={() => navigate('/products')} />;
  }
  return (
    <Box>
      <ProductFilter />
      <ProductList
        loading={loading}
        data={data}
        onAddItemToCart={onAddItemToCart}
        getProductCount={getProductCount}
      />
    </Box>
  );
});
