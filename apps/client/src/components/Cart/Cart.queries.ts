import { gql } from '../../__generated__';

export const CARTS_QUERY = gql(`
query ListCarts {
  cart {
    items {
      quantity
      productId
      product {
        name
        description
        unit
        price
        imageUrl
        availableQuantity
        limitPerTransaction
      }
    }
    checkoutDetails {
      subTotal
      enableCheckout
    }
  }
}`);

export const CLEAR_CART_MUTATION = gql(`
mutation ClearCart {
  clearCart {
    count
  }
}`);

export const ADD_ITEM_TO_CART_MUTATION = gql(`
mutation AddItemToCart($productId: String! = "apple", $quantity: Int!) {
  addItemToCart(cartInput: { productId: $productId, quantity: $quantity }) {
    count
  }
}`);
