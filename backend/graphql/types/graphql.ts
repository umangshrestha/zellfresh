/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ProductInput = {
  id?: string | null;
  name: string;
  imageUrl: string;
  description?: string | null;
  price: number;
  availableQuantity: number;
  limitPerTransaction: number;
  category: string;
  rating: number;
  badgeText?: string | null;
  tags: Array<string | null>;
};

export type Product = {
  __typename: "Product";
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  availableQuantity: number;
  limitPerTransaction: number;
  category: string;
  rating: number;
  badgeText: string;
  tags: Array<string>;
};

export type CartInput = {
  productId: string;
  quantity: number;
};

export type Cart = {
  __typename: "Cart";
  id: string;
  userId: string;
  count: number;
  items: Array<CartItem>;
  total: number;
};

export type CartItem = {
  __typename: "CartItem";
  product: Product;
  quantity: number;
};

export type PaginatedProducts = {
  __typename: "PaginatedProducts";
  items: Array<Product>;
  pagination?: Pagination | null;
};

export type Pagination = {
  __typename: "Pagination";
  limit: number;
  prev?: string | null;
  next?: string | null;
};

export type AddProductMutationVariables = {
  product: ProductInput;
};

export type AddProductMutation = {
  addProduct?: {
    __typename: "Product";
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    availableQuantity: number;
    limitPerTransaction: number;
    category: string;
    rating: number;
    badgeText: string;
    tags: Array<string>;
  } | null;
};

export type AddToCartMutationVariables = {
  userId: string;
  cart: CartInput;
};

export type AddToCartMutation = {
  addToCart?: {
    __typename: "Cart";
    id: string;
    userId: string;
    count: number;
    items: Array<{
      __typename: "CartItem";
      quantity: number;
    }>;
    total: number;
  } | null;
};

export type RemoveFromCartMutationVariables = {
  productId: string;
  quantity: number;
};

export type RemoveFromCartMutation = {
  removeFromCart?: {
    __typename: "Cart";
    id: string;
    userId: string;
    count: number;
    items: Array<{
      __typename: "CartItem";
      quantity: number;
    }>;
    total: number;
  } | null;
};

export type ClearCartMutationVariables = {};

export type ClearCartMutation = {
  clearCart?: {
    __typename: "Cart";
    id: string;
    userId: string;
    count: number;
    items: Array<{
      __typename: "CartItem";
      quantity: number;
    }>;
    total: number;
  } | null;
};

export type HelloQueryVariables = {
  name?: string | null;
};

export type HelloQuery = {
  hello: string;
};

export type ProductQueryVariables = {
  id: string;
};

export type ProductQuery = {
  product?: {
    __typename: "Product";
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    availableQuantity: number;
    limitPerTransaction: number;
    category: string;
    rating: number;
    badgeText: string;
    tags: Array<string>;
  } | null;
};

export type ProductsQueryVariables = {
  limit?: number | null;
  cursor?: string | null;
};

export type ProductsQuery = {
  products: {
    __typename: "PaginatedProducts";
    items: Array<{
      __typename: "Product";
      id: string;
      name: string;
      imageUrl: string;
      description: string;
      price: number;
      availableQuantity: number;
      limitPerTransaction: number;
      category: string;
      rating: number;
      badgeText: string;
      tags: Array<string>;
    }>;
    pagination?: {
      __typename: "Pagination";
      limit: number;
      prev?: string | null;
      next?: string | null;
    } | null;
  };
};

export type OnCartUpdateSubscriptionVariables = {
  userId: string;
};

export type OnCartUpdateSubscription = {
  onCartUpdate?: {
    __typename: "Cart";
    id: string;
    userId: string;
    count: number;
    items: Array<{
      __typename: "CartItem";
      quantity: number;
    }>;
    total: number;
  } | null;
};
