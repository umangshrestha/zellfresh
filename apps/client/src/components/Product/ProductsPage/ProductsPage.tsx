import Button from '@mui/material/Button';
import ServerErrorComponent from '../../ServerErrorComponent';
import ProductItem from '../ProductItem';
import { ProductEmptyPage } from './ProductEmptyPage';
import ProductLoadingPage from './ProductLoadingPage';
import { ProductPageProps } from './ProductPage.types';

export const ProductPage = ({
  data,
  loading,
  error,
  loadMore,
  onAddItemToCart
}: ProductPageProps) => {
  if (loading) return <ProductLoadingPage />;

  if (error) return <ServerErrorComponent error={error} />;

  if (!data || data.products.items.length === 0) return <ProductEmptyPage />;

  return (
    <div className="flex flex-col align-between">
      <div className="flex flex-wrap justify-center gap-4 p-4 flex-start">
        {data.products.items.map((product) => (
          <ProductItem
            key={product.productId}
            onAddItemToCart={onAddItemToCart}
            {...product}
          />
        ))}
      </div>
      <Button
        disabled={!data?.products?.pagination.next}
        onClick={loadMore}
        className="w-full text-center"
        color="primary"
        size="small"
      >
        show more
      </Button>
    </div>
  );
};
