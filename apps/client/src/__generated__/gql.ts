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
    "\nmutation AddItemToCart($productId: String!, $quantity: Int!) {\n  addItemToCart(cartInput: { productId: $productId, quantity: $quantity }) {\n    count\n  }\n}\n": types.AddItemToCartDocument,
    "\nquery ListCartsQueryVerbose {\n  cart {\n    items {\n      quantity\n      product {\n        productId\n        category\n        name\n        unit\n        price\n        imageUrl\n        availableQuantity\n        limitPerTransaction\n        description\n      }\n    }\n    checkoutDetails {\n      subTotal\n      enableCheckout\n    }\n  }\n}\n": types.ListCartsQueryVerboseDocument,
    "\nquery ListCartsQuerySimple{\n  cart {\n    items {\n      quantity\n      product {\n        productId\n        category\n      }\n    }\n    checkoutDetails {\n      subTotal\n      enableCheckout\n    }\n  }\n}\n": types.ListCartsQuerySimpleDocument,
    "\nsubscription CartCount{\n  cartCount\n}\n": types.CartCountDocument,
    "\nquery ListCategories {\n  categories {\n    name\n    icon\n    imageUrl\n    navigateUrl\n  }\n}": types.ListCategoriesDocument,
    "\n  query ListProducts(\n    $category: String\n    $maxPrice: Float\n    $minPrice: Float\n    $maxRating: Float\n    $minRating: Float\n    $tags: [String!]\n    $sortBy: ProductsSortBy\n    $sortAsc: Boolean\n    $name: String\n    $showOutOfStock: Boolean\n  ) {\n    products(\n      category: $category\n      maxPrice: $maxPrice\n      minPrice: $minPrice\n      maxRating: $maxRating\n      minRating: $minRating\n      tags: $tags\n      sortBy: $sortBy\n      sortAsc: $sortAsc\n      name: $name\n      showOutOfStock: $showOutOfStock\n    ) {\n      pagination {\n          next\n      }\n      items {\n        productId\n        name\n        imageUrl\n        description\n        price\n        unit\n        availableQuantity\n        limitPerTransaction\n        category\n        rating {\n          rating\n          count\n        }\n        badgeText\n      }\n    }\n  }\n": types.ListProductsDocument,
    "\nquery CheckoutPage{\n  cart {\n    items {\n      quantity\n      product {\n        name\n        price\n        imageUrl\n        availableQuantity\n        description\n        unit\n        category\n      }\n    }\n    checkoutDetails {\n      subTotal\n      enableCheckout\n    }\n  }\n  me {\n    email\n    name\n    phone\n    defaultAddress {\n      apt\n      street\n      zip\n    }\n  }\n}\n": types.CheckoutPageDocument,
    "\n  query ListOrders {\n  orders {\n    items {\n      createdAt\n      deliveryStatus\n      orderId\n      updatedAt\n      shippingAddress {\n        apt\n        street\n        city\n        state\n        country\n        zip\n        additionalInfo\n      }\n      items {\n        quantity\n        price\n        product {\n          productId\n          name\n          imageUrl\n          description\n          unit\n          category\n        }\n      }\n    }\n  }\n}": types.ListOrdersDocument,
    "\n  query OrdersQuery {\n    orders {\n      pagination {\n        next\n      }\n      items {\n        orderId\n        items {\n          productId\n          quantity\n          product {\n            name\n            price\n            imageUrl\n          }\n        }\n        deliveryStatus\n        shippingAddress {\n          addressId\n          apt\n          street\n          city\n          state\n          zip\n          country\n        }\n        contactDetails {\n          name\n          email\n          phone\n        }\n        paymentMethod\n        checkoutDetails {\n          deliveryPrice\n          subTotal\n          tax\n          totalPrice\n        }\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.OrdersQueryDocument,
    "\n  query OrderItemQuery($orderId: String!) {\n    order(orderId: $orderId) {\n      orderId\n      items {\n        productId\n        quantity\n        product {\n          name\n          price\n          imageUrl\n        }\n      }\n      deliveryStatus\n      shippingAddress {\n        addressId\n        apt\n        street\n        city\n        state\n        zip\n        country\n      }\n      contactDetails {\n        name\n        email\n        phone\n      }\n      paymentMethod\n        checkoutDetails {\n        deliveryPrice\n        subTotal\n        tax\n        totalPrice\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.OrderItemQueryDocument,
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
export function gql(source: "\nmutation AddItemToCart($productId: String!, $quantity: Int!) {\n  addItemToCart(cartInput: { productId: $productId, quantity: $quantity }) {\n    count\n  }\n}\n"): (typeof documents)["\nmutation AddItemToCart($productId: String!, $quantity: Int!) {\n  addItemToCart(cartInput: { productId: $productId, quantity: $quantity }) {\n    count\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery ListCartsQueryVerbose {\n  cart {\n    items {\n      quantity\n      product {\n        productId\n        category\n        name\n        unit\n        price\n        imageUrl\n        availableQuantity\n        limitPerTransaction\n        description\n      }\n    }\n    checkoutDetails {\n      subTotal\n      enableCheckout\n    }\n  }\n}\n"): (typeof documents)["\nquery ListCartsQueryVerbose {\n  cart {\n    items {\n      quantity\n      product {\n        productId\n        category\n        name\n        unit\n        price\n        imageUrl\n        availableQuantity\n        limitPerTransaction\n        description\n      }\n    }\n    checkoutDetails {\n      subTotal\n      enableCheckout\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery ListCartsQuerySimple{\n  cart {\n    items {\n      quantity\n      product {\n        productId\n        category\n      }\n    }\n    checkoutDetails {\n      subTotal\n      enableCheckout\n    }\n  }\n}\n"): (typeof documents)["\nquery ListCartsQuerySimple{\n  cart {\n    items {\n      quantity\n      product {\n        productId\n        category\n      }\n    }\n    checkoutDetails {\n      subTotal\n      enableCheckout\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nsubscription CartCount{\n  cartCount\n}\n"): (typeof documents)["\nsubscription CartCount{\n  cartCount\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery ListCategories {\n  categories {\n    name\n    icon\n    imageUrl\n    navigateUrl\n  }\n}"): (typeof documents)["\nquery ListCategories {\n  categories {\n    name\n    icon\n    imageUrl\n    navigateUrl\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListProducts(\n    $category: String\n    $maxPrice: Float\n    $minPrice: Float\n    $maxRating: Float\n    $minRating: Float\n    $tags: [String!]\n    $sortBy: ProductsSortBy\n    $sortAsc: Boolean\n    $name: String\n    $showOutOfStock: Boolean\n  ) {\n    products(\n      category: $category\n      maxPrice: $maxPrice\n      minPrice: $minPrice\n      maxRating: $maxRating\n      minRating: $minRating\n      tags: $tags\n      sortBy: $sortBy\n      sortAsc: $sortAsc\n      name: $name\n      showOutOfStock: $showOutOfStock\n    ) {\n      pagination {\n          next\n      }\n      items {\n        productId\n        name\n        imageUrl\n        description\n        price\n        unit\n        availableQuantity\n        limitPerTransaction\n        category\n        rating {\n          rating\n          count\n        }\n        badgeText\n      }\n    }\n  }\n"): (typeof documents)["\n  query ListProducts(\n    $category: String\n    $maxPrice: Float\n    $minPrice: Float\n    $maxRating: Float\n    $minRating: Float\n    $tags: [String!]\n    $sortBy: ProductsSortBy\n    $sortAsc: Boolean\n    $name: String\n    $showOutOfStock: Boolean\n  ) {\n    products(\n      category: $category\n      maxPrice: $maxPrice\n      minPrice: $minPrice\n      maxRating: $maxRating\n      minRating: $minRating\n      tags: $tags\n      sortBy: $sortBy\n      sortAsc: $sortAsc\n      name: $name\n      showOutOfStock: $showOutOfStock\n    ) {\n      pagination {\n          next\n      }\n      items {\n        productId\n        name\n        imageUrl\n        description\n        price\n        unit\n        availableQuantity\n        limitPerTransaction\n        category\n        rating {\n          rating\n          count\n        }\n        badgeText\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery CheckoutPage{\n  cart {\n    items {\n      quantity\n      product {\n        name\n        price\n        imageUrl\n        availableQuantity\n        description\n        unit\n        category\n      }\n    }\n    checkoutDetails {\n      subTotal\n      enableCheckout\n    }\n  }\n  me {\n    email\n    name\n    phone\n    defaultAddress {\n      apt\n      street\n      zip\n    }\n  }\n}\n"): (typeof documents)["\nquery CheckoutPage{\n  cart {\n    items {\n      quantity\n      product {\n        name\n        price\n        imageUrl\n        availableQuantity\n        description\n        unit\n        category\n      }\n    }\n    checkoutDetails {\n      subTotal\n      enableCheckout\n    }\n  }\n  me {\n    email\n    name\n    phone\n    defaultAddress {\n      apt\n      street\n      zip\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListOrders {\n  orders {\n    items {\n      createdAt\n      deliveryStatus\n      orderId\n      updatedAt\n      shippingAddress {\n        apt\n        street\n        city\n        state\n        country\n        zip\n        additionalInfo\n      }\n      items {\n        quantity\n        price\n        product {\n          productId\n          name\n          imageUrl\n          description\n          unit\n          category\n        }\n      }\n    }\n  }\n}"): (typeof documents)["\n  query ListOrders {\n  orders {\n    items {\n      createdAt\n      deliveryStatus\n      orderId\n      updatedAt\n      shippingAddress {\n        apt\n        street\n        city\n        state\n        country\n        zip\n        additionalInfo\n      }\n      items {\n        quantity\n        price\n        product {\n          productId\n          name\n          imageUrl\n          description\n          unit\n          category\n        }\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query OrdersQuery {\n    orders {\n      pagination {\n        next\n      }\n      items {\n        orderId\n        items {\n          productId\n          quantity\n          product {\n            name\n            price\n            imageUrl\n          }\n        }\n        deliveryStatus\n        shippingAddress {\n          addressId\n          apt\n          street\n          city\n          state\n          zip\n          country\n        }\n        contactDetails {\n          name\n          email\n          phone\n        }\n        paymentMethod\n        checkoutDetails {\n          deliveryPrice\n          subTotal\n          tax\n          totalPrice\n        }\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query OrdersQuery {\n    orders {\n      pagination {\n        next\n      }\n      items {\n        orderId\n        items {\n          productId\n          quantity\n          product {\n            name\n            price\n            imageUrl\n          }\n        }\n        deliveryStatus\n        shippingAddress {\n          addressId\n          apt\n          street\n          city\n          state\n          zip\n          country\n        }\n        contactDetails {\n          name\n          email\n          phone\n        }\n        paymentMethod\n        checkoutDetails {\n          deliveryPrice\n          subTotal\n          tax\n          totalPrice\n        }\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query OrderItemQuery($orderId: String!) {\n    order(orderId: $orderId) {\n      orderId\n      items {\n        productId\n        quantity\n        product {\n          name\n          price\n          imageUrl\n        }\n      }\n      deliveryStatus\n      shippingAddress {\n        addressId\n        apt\n        street\n        city\n        state\n        zip\n        country\n      }\n      contactDetails {\n        name\n        email\n        phone\n      }\n      paymentMethod\n        checkoutDetails {\n        deliveryPrice\n        subTotal\n        tax\n        totalPrice\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query OrderItemQuery($orderId: String!) {\n    order(orderId: $orderId) {\n      orderId\n      items {\n        productId\n        quantity\n        product {\n          name\n          price\n          imageUrl\n        }\n      }\n      deliveryStatus\n      shippingAddress {\n        addressId\n        apt\n        street\n        city\n        state\n        zip\n        country\n      }\n      contactDetails {\n        name\n        email\n        phone\n      }\n      paymentMethod\n        checkoutDetails {\n        deliveryPrice\n        subTotal\n        tax\n        totalPrice\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;