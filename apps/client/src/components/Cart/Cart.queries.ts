import { gql } from '@apollo/client';

export const ADD_ITEM_TO_CART_MUTATION = gql`
  mutation AddItemToCart($productId: String!, $quantity: Int!) {
    addItemToCart(cartInput: { productId: $productId, quantity: $quantity }) {
      count
    }
  }
`;

export const CARTS_QUERY_VERBOSE = gql`
  query {
    cart {
      items {
        quantity
        product {
          productId
          category
          name
          unit
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

export const CARTS_QUERY_SIMPLE = gql`
  query {
    cart {
      items {
        quantity
        product {
          productId
          category
        }
      }
    }
  }
`;

export const CART_COUNT_SUBSCRIPTION = gql`
  subscription {
    cartCount
  }
`;
