/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\nquery ListCarts {\n  cart {\n    items {\n      quantity\n      productId\n      product {\n        name\n        description\n        unit\n        price\n        imageUrl\n        availableQuantity\n        limitPerTransaction\n      }\n    }\n    checkoutDetails {\n      subTotal\n      enableCheckout\n    }\n  }\n}": types.ListCartsDocument,
    "\nmutation ClearCart {\n  clearCart {\n    count\n  }\n}": types.ClearCartDocument,
    "\nmutation AddItemToCart($productId: String! = \"apple\", $quantity: Int!) {\n  addItemToCart(cartInput: { productId: $productId, quantity: $quantity }) {\n    count\n  }\n}": types.AddItemToCartDocument,
    "\nsubscription CartCount{\n  cartCount\n}": types.CartCountDocument,
    "\nquery ListCategories {\n  categories {\n    name\n    icon\n    imageUrl\n    navigateUrl\n    isAvailable\n  }\n}": types.ListCategoriesDocument,
    "\nquery CheckoutPage{\n  cart {\n    items {\n      quantity\n      product {\n        name\n        description\n        unit\n        price\n        imageUrl\n        availableQuantity\n      }\n    }\n    checkoutDetails {\n      subTotal\n      totalPrice\n      tax\n      taxPercentage\n      deliveryPrice\n      enableCheckout\n    }\n  }\n  me {\n    email\n    name\n    phone\n    defaultAddress {\n      apt\n      street\n      zip\n      additionalInfo\n    }\n  }\n}": types.CheckoutPageDocument,
    "\nmutation Checkout($paymentMethod: PaymentMethod!) {\n  checkout(paymentMethod: $paymentMethod) {\n    orderId\n  }\n}": types.CheckoutDocument,
    "\nquery ListOrders($cursor: String) {\n orders(cursor: $cursor) {\n   items {\n     orderId\n     userId\n     items {\n       productId\n       quantity\n       price\n       product {\n         name\n         description\n         imageUrl\n         price\n         unit\n       }\n     }\n     deliveryStatus\n     shippingAddress {\n       apt\n       street\n       city\n       state\n       zip\n       country\n       additionalInfo\n     }\n     review {\n      rating\n      comment\n     }\n     paymentMethod\n     contactDetails {\n       name\n       phone\n       email\n     }\n     checkoutDetails {\n       totalPrice\n       subTotal\n       tax\n       discount\n       deliveryPrice\n       taxPercentage\n     }\n     createdAt\n     updatedAt\n     canCancel\n   }\n   pagination {\n     next\n   }\n }\n}": types.ListOrdersDocument,
    "\nmutation CancelOrder($orderId: String!) {\n cancelOrder(orderId: $orderId) {\n   orderId\n   deliveryStatus\n }\n}": types.CancelOrderDocument,
    "\nmutation SubmitFeedbackForOrder($orderId: String!, $rating: Float!, $comment: String!) {\n  submitOrderFeedback(orderId: $orderId, feedback: { rating: $rating, comment: $comment}) {\n    rating\n  }\n}": types.SubmitFeedbackForOrderDocument,
    "\nmutation ChangeOrderStatus($userId: String!, $orderId: String!, $status: DeliveryStatus!) {\n  changeOrderStatus(userId: $userId, orderId: $orderId, status: $status) {\n    deliveryStatus\n  }\n}": types.ChangeOrderStatusDocument,
    "\nquery ListProducts(\n  $category: String\n  $maxPrice: Float\n  $minPrice: Float\n  $maxRating: Float\n  $minRating: Float\n  $tags: [String!]\n  $sortBy: ProductsSortBy\n  $sortAsc: Boolean\n  $name: String\n  $showOutOfStock: Boolean\n  $cursor: String\n) {\n  products(\n    category: $category\n    maxPrice: $maxPrice\n    minPrice: $minPrice\n    maxRating: $maxRating\n    minRating: $minRating\n    tags: $tags\n    sortBy: $sortBy\n    sortAsc: $sortAsc\n    name: $name\n    showOutOfStock: $showOutOfStock\n    cursor: $cursor\n  ) {\n    pagination {\n        next\n    }\n    items {\n      productId\n      name\n      imageUrl\n      description\n      price\n      unit\n      availableQuantity\n      category\n      rating {\n        rating\n        count\n      }\n      badgeText\n    }\n  }\n}": types.ListProductsDocument,
    "\nmutation SubmitProductFeedback($productId: String!, $rating: Float!, $comment: String!) {\n  submitFeedback(productId: $productId, feedback: { rating: $rating, comment: $comment}) {\n    rating\n  }\n}": types.SubmitProductFeedbackDocument,
    "\nmutation PutAddress(\n  $addressId: String\n  $apt: String\n  $city: String!\n  $street: String!\n  $zip: String!\n  $state: String!\n  $country: String!\n  $additionalInfo: String\n) {\n  putAddress(\n    putAddressInput: {\n      addressId: $addressId\n      apt: $apt\n      city: $city\n      street: $street\n      zip: $zip\n      state: $state\n      country: $country\n      additionalInfo: $additionalInfo\n    }\n  ) {\n    addressId\n  }\n}": types.PutAddressDocument,
    "\nmutation PutUser(\n  $name: String!\n  $email: String!\n  $phone: String!\n  $imageUrl: String\n) {\n  updateUser(\n    updateUserInput: {\n      email: $email\n      name: $name\n      phone: $phone\n      imageUrl: $imageUrl\n    }\n  ) {\n    userId\n  }\n}": types.PutUserDocument,
    "\nquery Profile{\n  me {\n    email\n    name\n    phone\n    defaultAddress {\n      addressId\n      apt\n      street\n      zip\n      additionalInfo\n    }\n  }\n}": types.ProfileDocument,
    "\nquery GetRating($productId: String!) {\n  review(productId: $productId) {\n    rating\n    comment\n  }\n}": types.GetRatingDocument,
    "\nmutation SubmitFeedback($productId: String!, $rating: Float!, $comment: String!) {\n  submitFeedback(productId: $productId, feedback: { rating: $rating, comment: $comment}) {\n    rating\n  }\n}": types.SubmitFeedbackDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery ListCarts {\n  cart {\n    items {\n      quantity\n      productId\n      product {\n        name\n        description\n        unit\n        price\n        imageUrl\n        availableQuantity\n        limitPerTransaction\n      }\n    }\n    checkoutDetails {\n      subTotal\n      enableCheckout\n    }\n  }\n}"): (typeof documents)["\nquery ListCarts {\n  cart {\n    items {\n      quantity\n      productId\n      product {\n        name\n        description\n        unit\n        price\n        imageUrl\n        availableQuantity\n        limitPerTransaction\n      }\n    }\n    checkoutDetails {\n      subTotal\n      enableCheckout\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation ClearCart {\n  clearCart {\n    count\n  }\n}"): (typeof documents)["\nmutation ClearCart {\n  clearCart {\n    count\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation AddItemToCart($productId: String! = \"apple\", $quantity: Int!) {\n  addItemToCart(cartInput: { productId: $productId, quantity: $quantity }) {\n    count\n  }\n}"): (typeof documents)["\nmutation AddItemToCart($productId: String! = \"apple\", $quantity: Int!) {\n  addItemToCart(cartInput: { productId: $productId, quantity: $quantity }) {\n    count\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nsubscription CartCount{\n  cartCount\n}"): (typeof documents)["\nsubscription CartCount{\n  cartCount\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery ListCategories {\n  categories {\n    name\n    icon\n    imageUrl\n    navigateUrl\n    isAvailable\n  }\n}"): (typeof documents)["\nquery ListCategories {\n  categories {\n    name\n    icon\n    imageUrl\n    navigateUrl\n    isAvailable\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery CheckoutPage{\n  cart {\n    items {\n      quantity\n      product {\n        name\n        description\n        unit\n        price\n        imageUrl\n        availableQuantity\n      }\n    }\n    checkoutDetails {\n      subTotal\n      totalPrice\n      tax\n      taxPercentage\n      deliveryPrice\n      enableCheckout\n    }\n  }\n  me {\n    email\n    name\n    phone\n    defaultAddress {\n      apt\n      street\n      zip\n      additionalInfo\n    }\n  }\n}"): (typeof documents)["\nquery CheckoutPage{\n  cart {\n    items {\n      quantity\n      product {\n        name\n        description\n        unit\n        price\n        imageUrl\n        availableQuantity\n      }\n    }\n    checkoutDetails {\n      subTotal\n      totalPrice\n      tax\n      taxPercentage\n      deliveryPrice\n      enableCheckout\n    }\n  }\n  me {\n    email\n    name\n    phone\n    defaultAddress {\n      apt\n      street\n      zip\n      additionalInfo\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation Checkout($paymentMethod: PaymentMethod!) {\n  checkout(paymentMethod: $paymentMethod) {\n    orderId\n  }\n}"): (typeof documents)["\nmutation Checkout($paymentMethod: PaymentMethod!) {\n  checkout(paymentMethod: $paymentMethod) {\n    orderId\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery ListOrders($cursor: String) {\n orders(cursor: $cursor) {\n   items {\n     orderId\n     userId\n     items {\n       productId\n       quantity\n       price\n       product {\n         name\n         description\n         imageUrl\n         price\n         unit\n       }\n     }\n     deliveryStatus\n     shippingAddress {\n       apt\n       street\n       city\n       state\n       zip\n       country\n       additionalInfo\n     }\n     review {\n      rating\n      comment\n     }\n     paymentMethod\n     contactDetails {\n       name\n       phone\n       email\n     }\n     checkoutDetails {\n       totalPrice\n       subTotal\n       tax\n       discount\n       deliveryPrice\n       taxPercentage\n     }\n     createdAt\n     updatedAt\n     canCancel\n   }\n   pagination {\n     next\n   }\n }\n}"): (typeof documents)["\nquery ListOrders($cursor: String) {\n orders(cursor: $cursor) {\n   items {\n     orderId\n     userId\n     items {\n       productId\n       quantity\n       price\n       product {\n         name\n         description\n         imageUrl\n         price\n         unit\n       }\n     }\n     deliveryStatus\n     shippingAddress {\n       apt\n       street\n       city\n       state\n       zip\n       country\n       additionalInfo\n     }\n     review {\n      rating\n      comment\n     }\n     paymentMethod\n     contactDetails {\n       name\n       phone\n       email\n     }\n     checkoutDetails {\n       totalPrice\n       subTotal\n       tax\n       discount\n       deliveryPrice\n       taxPercentage\n     }\n     createdAt\n     updatedAt\n     canCancel\n   }\n   pagination {\n     next\n   }\n }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CancelOrder($orderId: String!) {\n cancelOrder(orderId: $orderId) {\n   orderId\n   deliveryStatus\n }\n}"): (typeof documents)["\nmutation CancelOrder($orderId: String!) {\n cancelOrder(orderId: $orderId) {\n   orderId\n   deliveryStatus\n }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation SubmitFeedbackForOrder($orderId: String!, $rating: Float!, $comment: String!) {\n  submitOrderFeedback(orderId: $orderId, feedback: { rating: $rating, comment: $comment}) {\n    rating\n  }\n}"): (typeof documents)["\nmutation SubmitFeedbackForOrder($orderId: String!, $rating: Float!, $comment: String!) {\n  submitOrderFeedback(orderId: $orderId, feedback: { rating: $rating, comment: $comment}) {\n    rating\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation ChangeOrderStatus($userId: String!, $orderId: String!, $status: DeliveryStatus!) {\n  changeOrderStatus(userId: $userId, orderId: $orderId, status: $status) {\n    deliveryStatus\n  }\n}"): (typeof documents)["\nmutation ChangeOrderStatus($userId: String!, $orderId: String!, $status: DeliveryStatus!) {\n  changeOrderStatus(userId: $userId, orderId: $orderId, status: $status) {\n    deliveryStatus\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery ListProducts(\n  $category: String\n  $maxPrice: Float\n  $minPrice: Float\n  $maxRating: Float\n  $minRating: Float\n  $tags: [String!]\n  $sortBy: ProductsSortBy\n  $sortAsc: Boolean\n  $name: String\n  $showOutOfStock: Boolean\n  $cursor: String\n) {\n  products(\n    category: $category\n    maxPrice: $maxPrice\n    minPrice: $minPrice\n    maxRating: $maxRating\n    minRating: $minRating\n    tags: $tags\n    sortBy: $sortBy\n    sortAsc: $sortAsc\n    name: $name\n    showOutOfStock: $showOutOfStock\n    cursor: $cursor\n  ) {\n    pagination {\n        next\n    }\n    items {\n      productId\n      name\n      imageUrl\n      description\n      price\n      unit\n      availableQuantity\n      category\n      rating {\n        rating\n        count\n      }\n      badgeText\n    }\n  }\n}"): (typeof documents)["\nquery ListProducts(\n  $category: String\n  $maxPrice: Float\n  $minPrice: Float\n  $maxRating: Float\n  $minRating: Float\n  $tags: [String!]\n  $sortBy: ProductsSortBy\n  $sortAsc: Boolean\n  $name: String\n  $showOutOfStock: Boolean\n  $cursor: String\n) {\n  products(\n    category: $category\n    maxPrice: $maxPrice\n    minPrice: $minPrice\n    maxRating: $maxRating\n    minRating: $minRating\n    tags: $tags\n    sortBy: $sortBy\n    sortAsc: $sortAsc\n    name: $name\n    showOutOfStock: $showOutOfStock\n    cursor: $cursor\n  ) {\n    pagination {\n        next\n    }\n    items {\n      productId\n      name\n      imageUrl\n      description\n      price\n      unit\n      availableQuantity\n      category\n      rating {\n        rating\n        count\n      }\n      badgeText\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation SubmitProductFeedback($productId: String!, $rating: Float!, $comment: String!) {\n  submitFeedback(productId: $productId, feedback: { rating: $rating, comment: $comment}) {\n    rating\n  }\n}"): (typeof documents)["\nmutation SubmitProductFeedback($productId: String!, $rating: Float!, $comment: String!) {\n  submitFeedback(productId: $productId, feedback: { rating: $rating, comment: $comment}) {\n    rating\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation PutAddress(\n  $addressId: String\n  $apt: String\n  $city: String!\n  $street: String!\n  $zip: String!\n  $state: String!\n  $country: String!\n  $additionalInfo: String\n) {\n  putAddress(\n    putAddressInput: {\n      addressId: $addressId\n      apt: $apt\n      city: $city\n      street: $street\n      zip: $zip\n      state: $state\n      country: $country\n      additionalInfo: $additionalInfo\n    }\n  ) {\n    addressId\n  }\n}"): (typeof documents)["\nmutation PutAddress(\n  $addressId: String\n  $apt: String\n  $city: String!\n  $street: String!\n  $zip: String!\n  $state: String!\n  $country: String!\n  $additionalInfo: String\n) {\n  putAddress(\n    putAddressInput: {\n      addressId: $addressId\n      apt: $apt\n      city: $city\n      street: $street\n      zip: $zip\n      state: $state\n      country: $country\n      additionalInfo: $additionalInfo\n    }\n  ) {\n    addressId\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation PutUser(\n  $name: String!\n  $email: String!\n  $phone: String!\n  $imageUrl: String\n) {\n  updateUser(\n    updateUserInput: {\n      email: $email\n      name: $name\n      phone: $phone\n      imageUrl: $imageUrl\n    }\n  ) {\n    userId\n  }\n}"): (typeof documents)["\nmutation PutUser(\n  $name: String!\n  $email: String!\n  $phone: String!\n  $imageUrl: String\n) {\n  updateUser(\n    updateUserInput: {\n      email: $email\n      name: $name\n      phone: $phone\n      imageUrl: $imageUrl\n    }\n  ) {\n    userId\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Profile{\n  me {\n    email\n    name\n    phone\n    defaultAddress {\n      addressId\n      apt\n      street\n      zip\n      additionalInfo\n    }\n  }\n}"): (typeof documents)["\nquery Profile{\n  me {\n    email\n    name\n    phone\n    defaultAddress {\n      addressId\n      apt\n      street\n      zip\n      additionalInfo\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetRating($productId: String!) {\n  review(productId: $productId) {\n    rating\n    comment\n  }\n}"): (typeof documents)["\nquery GetRating($productId: String!) {\n  review(productId: $productId) {\n    rating\n    comment\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation SubmitFeedback($productId: String!, $rating: Float!, $comment: String!) {\n  submitFeedback(productId: $productId, feedback: { rating: $rating, comment: $comment}) {\n    rating\n  }\n}"): (typeof documents)["\nmutation SubmitFeedback($productId: String!, $rating: Float!, $comment: String!) {\n  submitFeedback(productId: $productId, feedback: { rating: $rating, comment: $comment}) {\n    rating\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;