import ProductSkeleton from '../../ProductSkeleton';

export const ProductsLoadingPage = () => (
  <div>
    <div className="flex flex-wrap justify-center gap-4 p-4 flex-start">
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
    </div>
  </div>
);
