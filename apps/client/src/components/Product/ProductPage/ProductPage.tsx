import Box from '@mui/material/Box';
import { useProduct } from '../Product.hooks';
import ProductFilter from '../ProductFilter';
import ProductList from '../ProductList';

export const ProductPage = () => {
  const {
    data,
    loading,
    onAddItemToCart,
    getProductCount,
    onEmptyStateClicked,
  } = useProduct();
  const maxPrice = data.products?.items.reduce(
    (acc: number, item: any) => Math.max(acc, item.price),
    0,
  );
  return (
    <Box>
      <ProductFilter />
      <ProductList
        loading={loading}
        data={data}
        onAddItemToCart={onAddItemToCart}
        getProductCount={getProductCount}
        onEmptyStateClicked={onEmptyStateClicked}
      />
    </Box>
  );
};
