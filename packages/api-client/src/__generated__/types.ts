import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  checkoutDetails: CheckoutDetails;
  count: Scalars['Int']['output'];
  createdAt: Scalars['String']['output'];
  items: Array<CartItem>;
  ttl: CheckoutDetails;
  updatedAt: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type CartInput = {
  productId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type CartItem = {
  __typename?: 'CartItem';
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
  isAvailable: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  navigateUrl: Scalars['String']['output'];
};

export type CheckoutDetails = {
  __typename?: 'CheckoutDetails';
  deliveryPrice: Scalars['Float']['output'];
  discount: Scalars['Float']['output'];
  enableCheckout: Scalars['Boolean']['output'];
  subTotal: Scalars['Float']['output'];
  tax: Scalars['Float']['output'];
  taxPercentage: Scalars['Float']['output'];
  /** Total price of the order including delivery charge */
  totalPrice: Scalars['Float']['output'];
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
  Delivered = 'DELIVERED',
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Refunded = 'REFUNDED',
  Shipped = 'SHIPPED'
}

export type FeedbackInput = {
  comment: Scalars['String']['input'];
  rating: Scalars['Float']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addItemToCart: Cart;
  cancelOrder: Order;
  /** Admin User can change the delivery status of an order */
  changeOrderStatus: Order;
  checkout: Order;
  clearCart: Cart;
  deleteAddress: Address;
  putAddress: Address;
  setDefaultAddress: Address;
  submitFeedback: ProductReview;
  submitOrderFeedback: OrderReview;
  updateUser: User;
};


export type MutationAddItemToCartArgs = {
  cartInput: CartInput;
};


export type MutationCancelOrderArgs = {
  orderId: Scalars['String']['input'];
};


export type MutationChangeOrderStatusArgs = {
  orderId: Scalars['String']['input'];
  status: DeliveryStatus;
  userId: Scalars['String']['input'];
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


export type MutationSetDefaultAddressArgs = {
  addressId: Scalars['String']['input'];
};


export type MutationSubmitFeedbackArgs = {
  feedback: FeedbackInput;
  productId: Scalars['String']['input'];
};


export type MutationSubmitOrderFeedbackArgs = {
  feedback: FeedbackInput;
  orderId: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Order = {
  __typename?: 'Order';
  canCancel: Scalars['Boolean']['output'];
  checkoutDetails: CheckoutDetails;
  contactDetails: DeliveryContactDetails;
  count: Scalars['Int']['output'];
  createdAt: Scalars['String']['output'];
  deliveryStatus: DeliveryStatus;
  items: Array<OrderItem>;
  orderId: Scalars['String']['output'];
  paymentMethod: PaymentMethod;
  review?: Maybe<OrderReview>;
  shippingAddress: Address;
  updatedAt: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  createdAt: Scalars['String']['output'];
  /** Price at the time of order creation */
  price: Scalars['Float']['output'];
  product?: Maybe<Product>;
  productId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type OrderReview = {
  __typename?: 'OrderReview';
  comment: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  rating: Scalars['Float']['output'];
  updatedAt: Scalars['String']['output'];
};

export type PaginatedOrder = {
  __typename?: 'PaginatedOrder';
  items: Array<Order>;
  pagination: Pagination;
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
  rating: Rating;
  reviews: Array<ProductReview>;
  tags: Array<Scalars['String']['output']>;
  unit: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type ProductReview = {
  __typename?: 'ProductReview';
  comment: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  productId: Scalars['String']['output'];
  rating: Scalars['Float']['output'];
  updatedAt: Scalars['String']['output'];
  userId: Scalars['String']['output'];
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

export type Query = {
  __typename?: 'Query';
  address: Address;
  addresses: Array<Address>;
  cart: Cart;
  cartItem: CartItem;
  categories: Array<Category>;
  category?: Maybe<Category>;
  me?: Maybe<User>;
  order: Order;
  orders: PaginatedOrder;
  product?: Maybe<Product>;
  products: PaginatedProduct;
  review?: Maybe<ProductReview>;
  reviews: Array<ProductReview>;
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
  name: Scalars['String']['input'];
};


export type QueryOrderArgs = {
  orderId: Scalars['String']['input'];
};


export type QueryOrdersArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: Scalars['Int']['input'];
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

export type Subscription = {
  __typename?: 'Subscription';
  cartCount: Scalars['Int']['output'];
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Address: ResolverTypeWrapper<Address>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Cart: ResolverTypeWrapper<Cart>;
  CartInput: CartInput;
  CartItem: ResolverTypeWrapper<CartItem>;
  Category: ResolverTypeWrapper<Category>;
  CheckoutDetails: ResolverTypeWrapper<CheckoutDetails>;
  DeliveryContactDetails: ResolverTypeWrapper<DeliveryContactDetails>;
  DeliveryStatus: DeliveryStatus;
  FeedbackInput: FeedbackInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Order: ResolverTypeWrapper<Order>;
  OrderItem: ResolverTypeWrapper<OrderItem>;
  OrderReview: ResolverTypeWrapper<OrderReview>;
  PaginatedOrder: ResolverTypeWrapper<PaginatedOrder>;
  PaginatedProduct: ResolverTypeWrapper<PaginatedProduct>;
  Pagination: ResolverTypeWrapper<Pagination>;
  PaymentMethod: PaymentMethod;
  Product: ResolverTypeWrapper<Product>;
  ProductReview: ResolverTypeWrapper<ProductReview>;
  ProductsSortBy: ProductsSortBy;
  PutAddressInput: PutAddressInput;
  Query: ResolverTypeWrapper<{}>;
  Rating: ResolverTypeWrapper<Rating>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Address: Address;
  Boolean: Scalars['Boolean']['output'];
  Cart: Cart;
  CartInput: CartInput;
  CartItem: CartItem;
  Category: Category;
  CheckoutDetails: CheckoutDetails;
  DeliveryContactDetails: DeliveryContactDetails;
  FeedbackInput: FeedbackInput;
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Order: Order;
  OrderItem: OrderItem;
  OrderReview: OrderReview;
  PaginatedOrder: PaginatedOrder;
  PaginatedProduct: PaginatedProduct;
  Pagination: Pagination;
  Product: Product;
  ProductReview: ProductReview;
  PutAddressInput: PutAddressInput;
  Query: {};
  Rating: Rating;
  String: Scalars['String']['output'];
  Subscription: {};
  UpdateUserInput: UpdateUserInput;
  User: User;
};

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  additionalInfo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  addressId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  apt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  street?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  zip?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cart'] = ResolversParentTypes['Cart']> = {
  checkoutDetails?: Resolver<ResolversTypes['CheckoutDetails'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['CartItem']>, ParentType, ContextType>;
  ttl?: Resolver<ResolversTypes['CheckoutDetails'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['CartItem'] = ResolversParentTypes['CartItem']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  icon?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isAvailable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  navigateUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckoutDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CheckoutDetails'] = ResolversParentTypes['CheckoutDetails']> = {
  deliveryPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  discount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  enableCheckout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  subTotal?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  tax?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  taxPercentage?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeliveryContactDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeliveryContactDetails'] = ResolversParentTypes['DeliveryContactDetails']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addItemToCart?: Resolver<ResolversTypes['Cart'], ParentType, ContextType, RequireFields<MutationAddItemToCartArgs, 'cartInput'>>;
  cancelOrder?: Resolver<ResolversTypes['Order'], ParentType, ContextType, RequireFields<MutationCancelOrderArgs, 'orderId'>>;
  changeOrderStatus?: Resolver<ResolversTypes['Order'], ParentType, ContextType, RequireFields<MutationChangeOrderStatusArgs, 'orderId' | 'status' | 'userId'>>;
  checkout?: Resolver<ResolversTypes['Order'], ParentType, ContextType, RequireFields<MutationCheckoutArgs, 'paymentMethod'>>;
  clearCart?: Resolver<ResolversTypes['Cart'], ParentType, ContextType>;
  deleteAddress?: Resolver<ResolversTypes['Address'], ParentType, ContextType, RequireFields<MutationDeleteAddressArgs, 'addressId'>>;
  putAddress?: Resolver<ResolversTypes['Address'], ParentType, ContextType, RequireFields<MutationPutAddressArgs, 'putAddressInput'>>;
  setDefaultAddress?: Resolver<ResolversTypes['Address'], ParentType, ContextType, RequireFields<MutationSetDefaultAddressArgs, 'addressId'>>;
  submitFeedback?: Resolver<ResolversTypes['ProductReview'], ParentType, ContextType, RequireFields<MutationSubmitFeedbackArgs, 'feedback' | 'productId'>>;
  submitOrderFeedback?: Resolver<ResolversTypes['OrderReview'], ParentType, ContextType, RequireFields<MutationSubmitOrderFeedbackArgs, 'feedback' | 'orderId'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'updateUserInput'>>;
};

export type OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  canCancel?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  checkoutDetails?: Resolver<ResolversTypes['CheckoutDetails'], ParentType, ContextType>;
  contactDetails?: Resolver<ResolversTypes['DeliveryContactDetails'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deliveryStatus?: Resolver<ResolversTypes['DeliveryStatus'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['OrderItem']>, ParentType, ContextType>;
  orderId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  paymentMethod?: Resolver<ResolversTypes['PaymentMethod'], ParentType, ContextType>;
  review?: Resolver<Maybe<ResolversTypes['OrderReview']>, ParentType, ContextType>;
  shippingAddress?: Resolver<ResolversTypes['Address'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderItem'] = ResolversParentTypes['OrderItem']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderReview'] = ResolversParentTypes['OrderReview']> = {
  comment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedOrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedOrder'] = ResolversParentTypes['PaginatedOrder']> = {
  items?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType>;
  pagination?: Resolver<ResolversTypes['Pagination'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedProduct'] = ResolversParentTypes['PaginatedProduct']> = {
  items?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
  pagination?: Resolver<ResolversTypes['Pagination'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Pagination'] = ResolversParentTypes['Pagination']> = {
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  next?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  availableQuantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  badgeText?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  limitPerTransaction?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Rating'], ParentType, ContextType>;
  reviews?: Resolver<Array<ResolversTypes['ProductReview']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  unit?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductReview'] = ResolversParentTypes['ProductReview']> = {
  comment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  address?: Resolver<ResolversTypes['Address'], ParentType, ContextType, RequireFields<QueryAddressArgs, 'addressId'>>;
  addresses?: Resolver<Array<ResolversTypes['Address']>, ParentType, ContextType, RequireFields<QueryAddressesArgs, 'limit'>>;
  cart?: Resolver<ResolversTypes['Cart'], ParentType, ContextType>;
  cartItem?: Resolver<ResolversTypes['CartItem'], ParentType, ContextType, RequireFields<QueryCartItemArgs, 'productId'>>;
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<QueryCategoryArgs, 'name'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType, RequireFields<QueryOrderArgs, 'orderId'>>;
  orders?: Resolver<ResolversTypes['PaginatedOrder'], ParentType, ContextType, RequireFields<QueryOrdersArgs, 'limit'>>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryProductArgs, 'productId'>>;
  products?: Resolver<ResolversTypes['PaginatedProduct'], ParentType, ContextType, RequireFields<QueryProductsArgs, 'limit' | 'showOutOfStock' | 'sortAsc' | 'sortBy'>>;
  review?: Resolver<Maybe<ResolversTypes['ProductReview']>, ParentType, ContextType, RequireFields<QueryReviewArgs, 'productId'>>;
  reviews?: Resolver<Array<ResolversTypes['ProductReview']>, ParentType, ContextType, RequireFields<QueryReviewsArgs, 'limit' | 'productId' | 'sortAsc'>>;
};

export type RatingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Rating'] = ResolversParentTypes['Rating']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  cartCount?: SubscriptionResolver<ResolversTypes['Int'], "cartCount", ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  address?: Resolver<Array<ResolversTypes['Address']>, ParentType, ContextType, RequireFields<UserAddressArgs, 'limit'>>;
  blocked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  defaultAddress?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  defaultAddressId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Address?: AddressResolvers<ContextType>;
  Cart?: CartResolvers<ContextType>;
  CartItem?: CartItemResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  CheckoutDetails?: CheckoutDetailsResolvers<ContextType>;
  DeliveryContactDetails?: DeliveryContactDetailsResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  OrderItem?: OrderItemResolvers<ContextType>;
  OrderReview?: OrderReviewResolvers<ContextType>;
  PaginatedOrder?: PaginatedOrderResolvers<ContextType>;
  PaginatedProduct?: PaginatedProductResolvers<ContextType>;
  Pagination?: PaginationResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductReview?: ProductReviewResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Rating?: RatingResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

