import Button from '@mui/material/Button';
import ServerErrorComponent from '../../ServerErrorComponent';
import ProductItem from '../ProductItem';
import { ProductsEmptyPage } from './ProductsEmptyPage';
import ProductsLoadingPage from './ProductsLoadingPage';
import { ProductsPageProps } from './ProductsPage.types';

export const ProductsPage = ({
  data,
  loading,
  error,
  loadMore,
  onAddItemToCart
}: ProductsPageProps) => {
  if (loading) return <ProductsLoadingPage />;

  if (error) return <ServerErrorComponent error={error} />;

  if (!data || data.products.items.length === 0) return <ProductsEmptyPage />;

  return (
    <div className="block w-full">
      <div className="flex flex-wrap justify-start gap-4 p-4 flex-start">
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
