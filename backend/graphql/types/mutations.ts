/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./graphql";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const login = /* GraphQL */ `mutation Login($id: ID!) {
  login(id: $id) {
    id
    __typename
  }
}
` as GeneratedMutation<APITypes.LoginMutationVariables, APITypes.LoginMutation>;
export const addProduct =
  /* GraphQL */ `mutation AddProduct($product: ProductInput!) {
  addProduct(product: $product) {
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
    APITypes.AddProductMutationVariables,
    APITypes.AddProductMutation
  >;
export const addToCart =
  /* GraphQL */ `mutation AddToCart($userId: ID!, $cart: CartInput!) {
  addToCart(userId: $userId, cart: $cart) {
    id
    userId
    count
    items {
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
export const removeFromCart =
  /* GraphQL */ `mutation RemoveFromCart($productId: ID!, $quantity: Int!) {
  removeFromCart(productId: $productId, quantity: $quantity) {
    id
    userId
    count
    items {
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
export const deleteProduct = /* GraphQL */ `mutation DeleteProduct($id: ID!) {
  deleteProduct(id: $id) {
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
  APITypes.DeleteProductMutationVariables,
  APITypes.DeleteProductMutation
>;
