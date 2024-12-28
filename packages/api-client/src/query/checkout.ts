import { gql } from '../__generated__';

export const CHECKOUT_QUERY = gql(`
query CheckoutPage{
  cart {
    items {
      quantity
      product {
        name
        description
        unit
        price
        imageUrl
        availableQuantity
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
      additionalInfo
    }
  }
}`);

export const CHECKOUT_MUTATION = gql(`
mutation Checkout($paymentMethod: PaymentMethod!) {
  checkout(paymentMethod: $paymentMethod) {
    orderId
  }
}`);
