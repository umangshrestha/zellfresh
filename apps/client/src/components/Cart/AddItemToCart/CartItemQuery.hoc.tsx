import { ComponentType, useEffect } from 'react';
import { useProduct } from '../../Product/Product.hooks.ts';
import { useCart } from '../Cart.hooks.ts';
import type { CartItemProps } from '../CartItem';

export const withCartItemQuery = <T extends CartItemProps>(
  Component: ComponentType<T>,
) => {
  return (
    props: Omit<T, keyof CartItemProps> & {
      productId: string;
    },
  ) => {
    const { getCartItem, onAddItemToCart } = useCart();
    const { getProduct } = useProduct();
    const cartItem = getCartItem(props.productId);

    useEffect(() => {
      if (!cartItem) {
        onAddItemToCart(props.productId, 1);
      }
    }, []); // eslint-disable-line

    const product = Object.assign(
      {},
      getProduct(props.productId) || {},
      cartItem?.product || {},
    );
    return (
      <Component
        {...(props as T)}
        quantity={cartItem?.quantity || 0}
        product={product}
        onAddItemToCart={onAddItemToCart}
      />
    );
  };
};
