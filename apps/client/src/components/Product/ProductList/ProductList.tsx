import ProductItem from '../ProductItem';
import ProductSkeleton from '../ProductSkeleton';
import { ProductListProps } from './ProductList.types';


export const ProductList = ({
  data,
  loading,
  ...mutationFunctions
}: ProductListProps) => {

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 flex-start">
      {loading
        ? Array(8)
            .fill(0)
            .map((_, index) => <ProductSkeleton key={index} />)
        : data.map((product) => (
            <ProductItem
              key={product.productId}
              {...product}
              {...mutationFunctions}
            />
          ))}
    </div>
  );
};
