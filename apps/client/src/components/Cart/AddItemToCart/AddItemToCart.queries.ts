import { gql } from '../../../__generated__';

export const ADD_ITEM_TO_CART_MUTATION = gql(`
mutation AddItemToCart($productId: String!, $quantity: Int!) {
  addItemToCart(cartInput: { productId: $productId, quantity: $quantity }) {
    count
  }
}`);

export const CART_ITEM_QUERY = gql(`
query GetCartItem($productId: String!) {
  cartItem(productId: $productId) {
    quantity
  }
  product(productId: $productId) {
    name
    imageUrl
    price
    availableQuantity
    description
    limitPerTransaction
  }
}`);
