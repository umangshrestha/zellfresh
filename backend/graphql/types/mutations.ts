/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./graphql";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const putProduct = /* GraphQL */ `mutation PutProduct($product: ProductInput!) {
  putProduct(product: $product) {
    id
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
    __typename
  }
}
` as GeneratedMutation<
  APITypes.PutProductMutationVariables,
  APITypes.PutProductMutation
>;
export const addToCart = /* GraphQL */ `mutation AddToCart($productId: ID!, $quantity: Int!) {
  addToCart(productId: $productId, quantity: $quantity) {
    id
    userId
    count
    items {
      productId
      quantity
      __typename
    }
    total
    __typename
  }
}
` as GeneratedMutation<
  APITypes.AddToCartMutationVariables,
  APITypes.AddToCartMutation
>;
export const removeFromCart = /* GraphQL */ `mutation RemoveFromCart($productId: ID!, $quantity: Int!) {
  removeFromCart(productId: $productId, quantity: $quantity) {
    id
    userId
    count
    items {
      productId
      quantity
      __typename
    }
    total
    __typename
  }
}
` as GeneratedMutation<
  APITypes.RemoveFromCartMutationVariables,
  APITypes.RemoveFromCartMutation
>;
export const clearCart = /* GraphQL */ `mutation ClearCart {
  clearCart {
    id
    userId
    count
    items {
      productId
      quantity
      __typename
    }
    total
    __typename
  }
}
` as GeneratedMutation<
  APITypes.ClearCartMutationVariables,
  APITypes.ClearCartMutation
>;
