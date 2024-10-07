/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./graphql";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCartUpdate = /* GraphQL */ `subscription OnCartUpdate($userId: ID!) {
  onCartUpdate(userId: $userId) {
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
` as GeneratedSubscription<
  APITypes.OnCartUpdateSubscriptionVariables,
  APITypes.OnCartUpdateSubscription
>;
