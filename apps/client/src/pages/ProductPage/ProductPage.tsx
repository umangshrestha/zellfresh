import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../components/Cart';
import { LIST_PRODUCTS_QUERY } from '../../components/Product/Product.queries.ts';
import { ProductEmptyPage } from '../../components/Product/ProductEmptyPage';
import ProductFilter, {
  useProductFilter,
} from '../../components/Product/ProductFilter';
import { ProductItemType } from '../../components/Product/ProductItem';
import ProductList from '../../components/Product/ProductList';

export const ProductPage = memo(() => {
  const navigate = useNavigate();
  const isMapping = useMediaQuery('(max-width: 500px)');
  const { productFilter } = useProductFilter();
  const { data, loading, previousData, fetchMore } = useQuery(
    LIST_PRODUCTS_QUERY,
    {
      variables: (productFilter || {}) as object,
    },
  );
  const [products, setProducts] = useState<ProductItemType[]>([]);

  const { onAddItemToCart, getProductCount } = useCart();
  const isLoading = loading && !previousData;
  const targetData = loading ? previousData : data;
  const isEmpty = !loading && !targetData?.products?.items.length;

  const handleLoadMore = () => {
    if (data && data.products.pagination.next) {
      fetchMore({
        variables: {
          cursor: data.products.pagination.next,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newProducts = fetchMoreResult.products.items;
          setProducts([...products, ...newProducts]);

          return {
            products: {
              __typename: previousResult.products.__typename,
              items: [...previousResult.products.items, ...newProducts],
              pagination: fetchMoreResult.products.pagination,
            },
          };
        },
      }).catch((e) => {
        console.error(e);
      });
    }
  };

  return (
    <Box className={isMapping ? 'flex flex-col' : 'flex'}>
      <ProductFilter onClick={navigate} />
      {isEmpty ? (
        <ProductEmptyPage category={productFilter?.category} />
      ) : (
        <div>
          <Typography variant="h5" className="pt-4 pl-4">
            Products ({productFilter?.category || 'All'})
          </Typography>
          <ProductList
            loading={isLoading}
            data={targetData?.products?.items || []}
            onAddItemToCart={onAddItemToCart}
            getProductCount={getProductCount}
          />
          <div className="flex justify-center">
            <Button
              onClick={handleLoadMore}
              disabled={loading || !data?.products?.pagination.next}
            >
              Load More
            </Button>
          </div>
        </div>
      )}
    </Box>
  );
});
