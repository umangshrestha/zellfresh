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
