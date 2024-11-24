import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../components/Cart';
import { ProductEmptyPage } from '../../components/Product/ProductEmptyPage';
import ProductFilter from '../../components/Product/ProductFilter';
import ProductList from '../../components/Product/ProductList';
import { useProduct } from '../../components/Product/Product.hooks.ts';

export const ProductPage = memo(() => {
  const navigate = useNavigate();
  const isMapping = useMediaQuery('(max-width: 500px)');
 const {data, loading, loadMore, category} = useProduct()
  const { onAddItemToCart, getProductCount } = useCart();

  const isEmpty = !loading && !data?.products?.items?.length;

  return (
    <Box className={isMapping ? 'flex flex-col' : 'flex'}>
      <ProductFilter onClick={navigate} />
      {isEmpty ? (
        <ProductEmptyPage category={category} />
      ) : (
        <div>
          <Typography variant="h5" className="pt-4 pl-4">
            Products ({category || 'All'})
          </Typography>
          <ProductList
            loading={loading}
            data={data?.products?.items || []}
            onAddItemToCart={onAddItemToCart}
            getProductCount={getProductCount}
          />
          <div className="flex justify-center">
            <Button
              onClick={loadMore}
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
