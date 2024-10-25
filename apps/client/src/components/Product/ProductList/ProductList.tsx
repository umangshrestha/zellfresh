import EmptyPage from '../../EmptyPage';
import ProductItem from '../ProductItem';
import ProductSkeleton from '../ProductSkeleton';
import { ProductListProps } from './ProductList.types';

export const ProductList = ({
  data,
  loading,
  onEmptyStateClicked,
  ...mutationFunctions
}: ProductListProps) => {
  if (loading) {
    return (
      <div className="flex flex-wrap justify-center gap-4 p-4 flex-start">
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
          'There are no products with the selected filters.',
          'Please try again with different filters.',
        ]}
        buttonText="Reset Filters"
        image="/empty-product.png"
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
          {...mutationFunctions}
        />
      ))}
    </div>
  );
};
