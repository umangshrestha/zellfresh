import React from 'react';
import { useAddItemToCart } from './AddItemToCart.hooks';
import { AddItemToCart as AddItemToCartComponent } from './AddItemToCart.tsx';

const AddItemToCart = () => {
  const { productId, setProductId } = useAddItemToCart();
  if (!productId) return <React.Fragment />;
  return (
    <AddItemToCartComponent
      productId={productId}
      onClose={() => setProductId(null)}
    />
  );
};

export default AddItemToCart;
