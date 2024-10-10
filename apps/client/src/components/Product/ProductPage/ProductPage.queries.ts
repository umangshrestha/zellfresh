import { gql } from '@apollo/client';

export const PRODUCTS = gql`
  query {
    products {
      items {
        productId
        name
        imageUrl
        description
        price
        availableQuantity
        limitPerTransaction
        category
        rating
        badgeText
        tags
      }
    }
  }
`;

export const ADD_ITEM_TO_CART = gql`
  mutation addItemToCart($cartInput: CartInput!) {
    addItemToCart(cartInput: $cartInput) {
      id
      quantity
    }
  }
`;
