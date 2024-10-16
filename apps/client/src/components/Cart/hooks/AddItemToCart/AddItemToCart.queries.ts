import { gql } from '@apollo/client';

export const ADD_ITEM_TO_CART_MUTATION = gql`
  mutation AddItemToCart($productId: String!, $quantity: Int!) {
    addItemToCart(cartInput: { productId: $productId, quantity: $quantity }) {
      count
    }
  }
`;
