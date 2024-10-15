import { gql } from '@apollo/client';

export const CARTS = gql`
  query {
    cart {
      items {
        productId
      }
    }
  }
`;

export const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($productId: String!, $quantity: Int!) {
    addItemToCart(cartInput: { productId: $productId, quantity: $quantity }) {
      count
    }
  }
`;

export const CART_ITEM = gql`
  query CartItem($productId: String!) {
    cartItem(productId: $productId) {
      quantity
    }
  }
`;
