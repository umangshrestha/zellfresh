import React from 'react';
import { useAddItemToCart } from './AddItemToCart.hooks';
import { AddItemToCart as AddItemToCartComponent } from './AddItemToCart.tsx';
import { withCartItemQuery } from './CartItemQuery.hoc.tsx';

const AddItemToCartWithQuery = withCartItemQuery(AddItemToCartComponent);
const AddItemToCart = () => {
  const { productId, setProductId } = useAddItemToCart();
  if (productId === null) return <React.Fragment />;
  return (
    <AddItemToCartWithQuery
      productId={productId}
      onClose={() => setProductId(null)}
    />
  );
};

export default AddItemToCart;
