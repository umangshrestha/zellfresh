import { gql } from '../../__generated__';

export const ADD_ITEM_TO_CART_MUTATION = gql(`
mutation AddItemToCart($productId: String!, $quantity: Int!) {
  addItemToCart(cartInput: { productId: $productId, quantity: $quantity }) {
    count
  }
}
`);

export const CARTS_QUERY_VERBOSE = gql(`
query ListCartsQueryVerbose {
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
    checkoutDetails {
      subTotal
      enableCheckout
    }
  }
}
`);

export const CARTS_QUERY_SIMPLE = gql(`
query ListCartsQuerySimple{
  cart {
    items {
      quantity
      product {
        productId
        category
      }
    }
    checkoutDetails {
      subTotal
      enableCheckout
    }
  }
}
`);

export const CART_COUNT_SUBSCRIPTION = gql(`
subscription CartCount{
  cartCount
}
`);
