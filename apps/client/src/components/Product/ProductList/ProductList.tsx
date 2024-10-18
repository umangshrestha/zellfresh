import EmptyPage from '../../EmptyPage';
import ProductItem from '../ProductItem';
import ProductSkeleton from '../ProductSkeleton';
import { ProductListProps } from './ProductList.types';

export const ProductList = ({
  data,
  loading,
  onAddItemToCart,
  onEmptyStateClicked,
}: ProductListProps) => {
  if (loading) {
    return (
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <EmptyPage
        title="No products available"
        description={[
          'There are no products available at the moment',
          'Please check back later',
        ]}
        buttonText="Refresh"
        image="/public/empty-product.png"
        alt="No products available"
        onClick={onEmptyStateClicked}
      />
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {data.map((product) => (
        <ProductItem
          key={product.productId}
          {...product}
          onAddItemToCart={onAddItemToCart}
        />
      ))}
    </div>
  );
};
