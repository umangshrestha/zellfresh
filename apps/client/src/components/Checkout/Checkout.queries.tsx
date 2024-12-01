import { gql } from '../../__generated__';

export const CHECKOUT_QUERY = gql(`
query CheckoutPage{
  cart {
    items {
      quantity
      product {
        name
        description
        price
        productId
        imageUrl
        availableQuantity
        unit
        category
      }
    }
    checkoutDetails {
      subTotal
      totalPrice
      tax
      taxPercentage
      deliveryPrice
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
}`);

export const CHECKOUT_MUTATION = gql(`
mutation Checkout($paymentMethod: PaymentMethod!) {
  checkout(paymentMethod: $paymentMethod) {
    orderId
  }
}`);