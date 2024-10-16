import { gql } from '@apollo/client';

export const CART_ITEM_QUERY = gql`
  query CartItem($productId: String!) {
    cartItem(productId: $productId) {
      quantity
    }
  }
`;
