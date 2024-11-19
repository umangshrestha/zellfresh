import { gql } from '@apollo/client';

export const CHECKOUT_QUERY = gql(`
query CheckoutPage{
  cart {
    items {
      quantity
      product {
        name
        price
        imageUrl
        availableQuantity
        description
        unit
        category
      }
    }
    checkoutDetails {
      subTotal
      enableCheckout
    }
  }
  me {
    email
    name
    phone
    defaultAddress {
      apt
      street
      zip
    }
  }
}
`);

export const CHECKOUT_MUTATION = gql(`
  mutation ($paymentMethod: PaymentMethod!) {
    checkout(paymentMethod: $paymentMethod) {
      orderId
    }
  }
`);
