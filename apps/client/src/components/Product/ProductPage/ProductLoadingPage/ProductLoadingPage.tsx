import ProductSkeleton from '../../ProductSkeleton';

export const ProductLoadingPage = () =>
  Array(8)
    .fill(0)
    .map((_, index) => <ProductSkeleton key={index} />);
