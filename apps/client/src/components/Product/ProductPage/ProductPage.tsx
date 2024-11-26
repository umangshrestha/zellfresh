import Button from '@mui/material/Button';
import ServerErrorComponent from '../../ServerErrorComponent';
import ProductItem from '../ProductItem';
import { ProductEmptyPage } from './ProductEmptyPage';
import ProductLoadingPage from './ProductLoadingPage';
import { ProductPageProps } from './ProductPage.types';
import { useState } from 'react';
import RatingDialog from '../../RatingDialog';
import { useProductFeedback } from '../ProductFeedback.hooks.ts';

const ProductRatingDialog = ({
  productId,
  currentRating,
  onClose,
}: {
  onClose: () => void;
  productId: string;
  currentRating: number;
}) => {
  const { submitFeedback, ...props} = useProductFeedback(productId);
  const onFeedbackSubmit = (rating: number, comment: string) => {
    submitFeedback(rating, comment);
    onClose();
  }
  return <RatingDialog currentRating={currentRating} {...props} submitFeedback={onFeedbackSubmit} />
}


export const ProductPage = ({
  data,
  loading,
  error,
  loadMore,
  ...mutationFunctions
}: ProductPageProps) => {
  const [productFeedbackId, setProductFeedbackId] = useState<string | null>();
  const [currentRating, setCurrentRating] = useState<number | null>();

  if (loading) return <ProductLoadingPage />;

  if (error) return <ServerErrorComponent error={error} />;

  if (!data || data.products.items.length === 0) return <ProductEmptyPage />;

  return (
    <div className="flex flex-col align-between">
      {
        productFeedbackId && (
          <ProductRatingDialog
            productId={productFeedbackId}
            currentRating={currentRating || 0}
            onClose={() => setProductFeedbackId(null)}
          />
        )
      }
      <div className="flex flex-wrap justify-center gap-4 p-4 flex-start">
        {data.products.items.map((product) => (
          <ProductItem
            key={product.productId}
            {...product}
            {...mutationFunctions}
            onRatingClick={(productId, rating) => {
              setCurrentRating(rating);
              setProductFeedbackId(productId);
            }}
          />
        ))}
      </div>
      <Button
        disabled={!data?.products?.pagination.next}
        onClick={loadMore}
        color="primary"
        size="small"
      >
        show more
      </Button>
    </div>
  );
};
