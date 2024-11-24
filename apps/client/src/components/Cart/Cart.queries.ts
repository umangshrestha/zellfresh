import { gql } from '../../__generated__';

export const ADD_ITEM_TO_CART_MUTATION = gql(`
mutation AddItemToCart($productId: String!, $quantity: Int!) {
  addItemToCart(cartInput: { productId: $productId, quantity: $quantity }) {
    count
  }
}`);

export const CARTS_QUERY_VERBOSE = gql(`
query ListCartsVerbose {
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
        badgeText
        availableQuantity
        limitPerTransaction
        description
      }
    }
    checkoutDetails {
      subTotal
      enableCheckout
    }
  }
}`);
