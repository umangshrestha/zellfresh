import { useEffect } from 'react';
import { useNotification } from '../../Notification';
import ProductItem from '../ProductItem';
import ProductSkeleton from '../ProductSkeleton';
import { ProductListProps } from './ProductList.types';

export const ProductList = ({
  data,
  loading,
  error,
  onAddToCart,
}: ProductListProps) => {
  const { setNotification } = useNotification();
  useEffect(() => {
    if (error) {
      setNotification({
        message: error.message,
        severity: 'error',
      });
    }
  }, [error, setNotification]);

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
    return <div className="p-4">No products available</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {data.map((product) => (
        <ProductItem
          key={product.productId}
          {...product}
          onClick={onAddToCart}
        />
      ))}
    </div>
  );
};
