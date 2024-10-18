import { gql } from '@apollo/client';

export const CART_ITEM_QUERY = gql`
  query CartItem($productId: String!) {
    cartItem(productId: $productId) {
      quantity
    }
  }
`;

export const CART_COUNT_QUERY = gql`
  query {
    cart {
      count
    }
  }
`;

export const ADD_ITEM_TO_CART_MUTATION = gql`
  mutation AddItemToCart($productId: String!, $quantity: Int!) {
    addItemToCart(cartInput: { productId: $productId, quantity: $quantity }) {
      count
    }
  }
`;

export const CARTS_QUERY = gql`
  query {
    cart {
      count
      items {
        quantity
        product {
          productId
          name
          price
          imageUrl
          availableQuantity
          limitPerTransaction
          description
        }
      }
    }
  }
`;
