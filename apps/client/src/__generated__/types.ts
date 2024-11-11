export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Address = {
  __typename?: 'Address';
  additionalInfo?: Maybe<Scalars['String']['output']>;
  addressId: Scalars['String']['output'];
  apt?: Maybe<Scalars['String']['output']>;
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  state: Scalars['String']['output'];
  street: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  zip: Scalars['String']['output'];
};

export type Cart = {
  __typename?: 'Cart';
  count: Scalars['Int']['output'];
  createdAt: Scalars['String']['output'];
  items: Array<CartItem>;
  updatedAt: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type CartInput = {
  productId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type CartItem = {
  __typename?: 'CartItem';
  category: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  product?: Maybe<Product>;
  productId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Category = {
  __typename?: 'Category';
  icon: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
  navigateUrl: Scalars['String']['output'];
};

export type DeliveryContactDetails = {
  __typename?: 'DeliveryContactDetails';
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
};

/** The status of the order */
export enum DeliveryStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Delivered = 'DELIVERED',
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Refunded = 'REFUNDED',
  Shipped = 'SHIPPED'
}

export type Mutation = {
  __typename?: 'Mutation';
  addItemToCart: Cart;
  cancelOrder: Order;
  checkout: Order;
  clearCart: Cart;
  deleteAddress: Address;
  putAddress: Address;
  putRating: Review;
  removeRating: Review;
  setDefaultAddress: Address;
  updateUser: User;
};


export type MutationAddItemToCartArgs = {
  cartInput: CartInput;
};


export type MutationCancelOrderArgs = {
  id: Scalars['Int']['input'];
};


export type MutationCheckoutArgs = {
  paymentMethod: PaymentMethod;
};


export type MutationDeleteAddressArgs = {
  addressId: Scalars['String']['input'];
};


export type MutationPutAddressArgs = {
  putAddressInput: PutAddressInput;
};


export type MutationPutRatingArgs = {
  productId: Scalars['String']['input'];
  putReviewInput: PutReviewInput;
};


export type MutationRemoveRatingArgs = {
  productId: Scalars['String']['input'];
};


export type MutationSetDefaultAddressArgs = {
  addressId: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Order = {
  __typename?: 'Order';
  contactDetails: DeliveryContactDetails;
  createdAt: Scalars['String']['output'];
  deliveryStatus: DeliveryStatus;
  items: Array<CartItem>;
  orderId: Scalars['String']['output'];
  paymentDetails: PaymentDetails;
  shippingAddress: Address;
  updatedAt: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type PaginatedProduct = {
  __typename?: 'PaginatedProduct';
  items: Array<Product>;
  pagination: Pagination;
};

export type Pagination = {
  __typename?: 'Pagination';
  limit: Scalars['Int']['output'];
  next?: Maybe<Scalars['String']['output']>;
  prev?: Maybe<Scalars['String']['output']>;
};

export type PaymentDetails = {
  __typename?: 'PaymentDetails';
  deliveryPrice: Scalars['Float']['output'];
  paymentMethod: PaymentMethod;
  subTotal: Scalars['Int']['output'];
  tax: Scalars['Float']['output'];
  /** Total price of the order including delivery charge */
  totalPrice: Scalars['Float']['output'];
};

/** The status of the order */
export enum PaymentMethod {
  Card = 'CARD',
  Cash = 'CASH',
  Upi = 'UPI'
}

export type Product = {
  __typename?: 'Product';
  availableQuantity: Scalars['Int']['output'];
  badgeText: Scalars['String']['output'];
  category: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  imageUrl: Scalars['String']['output'];
  limitPerTransaction: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  productId: Scalars['String']['output'];
  rating?: Maybe<Rating>;
  reviews: Array<Review>;
  tags: Array<Scalars['String']['output']>;
  unit: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

/** Sort products by */
export enum ProductsSortBy {
  Name = 'NAME',
  Price = 'PRICE',
  Rating = 'RATING'
}

export type PutAddressInput = {
  additionalInfo?: InputMaybe<Scalars['String']['input']>;
  addressId?: InputMaybe<Scalars['String']['input']>;
  apt?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  state: Scalars['String']['input'];
  street: Scalars['String']['input'];
  zip: Scalars['String']['input'];
};

export type PutReviewInput = {
  comment: Scalars['String']['input'];
  rating: Scalars['Float']['input'];
};

export type Query = {
  __typename?: 'Query';
  address: Address;
  addresses: Array<Address>;
  cart: Cart;
  cartItem: CartItem;
  categories: Array<Category>;
  category: Category;
  me?: Maybe<User>;
  order: Order;
  orders: Array<Order>;
  product: Product;
  products: PaginatedProduct;
  review: Review;
  reviews: Array<Review>;
};


export type QueryAddressArgs = {
  addressId: Scalars['String']['input'];
};


export type QueryAddressesArgs = {
  limit?: Scalars['Int']['input'];
};


export type QueryCartItemArgs = {
  productId: Scalars['String']['input'];
};


export type QueryCategoryArgs = {
  id: Scalars['String']['input'];
};


export type QueryOrderArgs = {
  id: Scalars['Int']['input'];
};


export type QueryProductArgs = {
  productId: Scalars['String']['input'];
};


export type QueryProductsArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: Scalars['Int']['input'];
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  maxRating?: InputMaybe<Scalars['Float']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  minRating?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  showOutOfStock?: InputMaybe<Scalars['Boolean']['input']>;
  sortAsc?: InputMaybe<Scalars['Boolean']['input']>;
  sortBy?: InputMaybe<ProductsSortBy>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QueryReviewArgs = {
  productId: Scalars['String']['input'];
};


export type QueryReviewsArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: Scalars['Int']['input'];
  maxRating?: InputMaybe<Scalars['Float']['input']>;
  minRating?: InputMaybe<Scalars['Float']['input']>;
  productId: Scalars['String']['input'];
  sortAsc?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Rating = {
  __typename?: 'Rating';
  count: Scalars['Int']['output'];
  rating: Scalars['Float']['output'];
};

export type Review = {
  __typename?: 'Review';
  comment: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  productId: Scalars['String']['output'];
  rating: Scalars['Float']['output'];
  updatedAt: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type UpdateUserInput = {
  email: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  address: Array<Address>;
  blocked: Scalars['Boolean']['output'];
  createdAt: Scalars['String']['output'];
  defaultAddress?: Maybe<Address>;
  defaultAddressId?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};


export type UserAddressArgs = {
  limit?: Scalars['Int']['input'];
};
