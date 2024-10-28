import Box from '@mui/material/Box';
import { memo, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProduct } from '../Product.hooks';
import { ProductEmptyPage } from '../ProductEmptyPage';
import ProductFilter, { useProductFilter } from '../ProductFilter';
import ProductList from '../ProductList';

export const ProductPage = memo(() => {
  const navigate = useNavigate();
  const { category } = useParams();
  const {
    productFilter: variables,
    updateProductFilter,
    resetProductFilter,
  } = useProductFilter();
  const { data, loading, onAddItemToCart, getProductCount } =
    useProduct(variables);

  const handleUpdateProductFilter = useCallback(() => {
    updateProductFilter({ category });
  }, [updateProductFilter, category]);

  useEffect(() => {
    handleUpdateProductFilter();
  }, [handleUpdateProductFilter]);

  return (
    <Box>
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
