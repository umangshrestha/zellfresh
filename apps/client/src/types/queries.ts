/* tslint:disable */

// this is an auto generated file. This will be overwritten

import * as APITypes from './graphql';
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const hello = /* GraphQL */ `query Hello($name: String) {
  hello(name: $name)
}
` as GeneratedQuery<APITypes.HelloQueryVariables, APITypes.HelloQuery>;
export const product = /* GraphQL */ `query Product($id: ID!) {
  product(id: $id) {
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
` as GeneratedQuery<APITypes.ProductQueryVariables, APITypes.ProductQuery>;
export const products =
  /* GraphQL */ `query Products($limit: Int = 10, $cursor: String) {
  products(limit: $limit, cursor: $cursor) {
    items {
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
    pagination {
      limit
      prev
      next
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<APITypes.ProductsQueryVariables, APITypes.ProductsQuery>;
export const me = /* GraphQL */ `query Me {
  me
}
` as GeneratedQuery<APITypes.MeQueryVariables, APITypes.MeQuery>;
