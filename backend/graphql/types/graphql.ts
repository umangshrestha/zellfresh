/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ProductInput = {
  id?: string | null,
  name: string,
  imageUrl: string,
  description?: string | null,
  price: number,
  availableQuantity: number,
  limitPerTransaction: number,
  category: string,
  rating: number,
  badgeText?: string | null,
  tags: Array< string | null >,
};

export type Product = {
  __typename: "Product",
  id: string,
  name: string,
  imageUrl: string,
  description?: string | null,
  price: number,
  availableQuantity: number,
  limitPerTransaction: number,
  category: string,
  rating: number,
  badgeText?: string | null,
  tags: Array< string | null >,
};

export type PaginatedProducts = {
  __typename: "PaginatedProducts",
  items?:  Array<Product | null > | null,
  pagination?: Pagination | null,
};

export type Pagination = {
  __typename: "Pagination",
  limit: number,
  prev?: string | null,
  next?: string | null,
};

export type PutProductMutationVariables = {
  product: ProductInput,
};

export type PutProductMutation = {
  putProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    imageUrl: string,
    description?: string | null,
    price: number,
    availableQuantity: number,
    limitPerTransaction: number,
    category: string,
    rating: number,
    badgeText?: string | null,
    tags: Array< string | null >,
  } | null,
};

export type HelloQueryVariables = {
  name?: string | null,
};

export type HelloQuery = {
  hello: string,
};

export type ProductQueryVariables = {
  id: string,
};

export type ProductQuery = {
  product?:  {
    __typename: "Product",
    id: string,
    name: string,
    imageUrl: string,
    description?: string | null,
    price: number,
    availableQuantity: number,
    limitPerTransaction: number,
    category: string,
    rating: number,
    badgeText?: string | null,
    tags: Array< string | null >,
  } | null,
};

export type ProductsQueryVariables = {
  limit?: number | null,
  cursor?: string | null,
};

export type ProductsQuery = {
  products:  {
    __typename: "PaginatedProducts",
    items?:  Array< {
      __typename: "Product",
      id: string,
      name: string,
      imageUrl: string,
      description?: string | null,
      price: number,
      availableQuantity: number,
      limitPerTransaction: number,
      category: string,
      rating: number,
      badgeText?: string | null,
      tags: Array< string | null >,
    } | null > | null,
    pagination?:  {
      __typename: "Pagination",
      limit: number,
      prev?: string | null,
      next?: string | null,
    } | null,
  },
};
