import { gql } from '../../__generated__';

export const PUT_ADDRESS_MUTATION = gql(`
  mutation PutAddress(
    $addressId: String
    $apt: String
    $city: String!
    $street: String!
    $zip: String!
    $state: String!
    $country: String!
    $additionalInfo: String
  ) {
    putAddress(
      putAddressInput: {
        addressId: $addressId
        apt: $apt
        city: $city
        street: $street
        zip: $zip
        state: $state
        country: $country
        additionalInfo: $additionalInfo
      }
    ) {
      addressId
    }
  }
`);

export const PUT_USER_MUTATION = gql(`
  mutation PutUser(
    $name: String!
    $email: String!
    $phone: String!
    $imageUrl: String
  ) {
    updateUser(
      updateUserInput: {
        email: $email
        name: $name
        phone: $phone
        imageUrl: $imageUrl
      }
    ) {
      userId
    }
  }
`);

export const PROFILE_QUERY = gql(`
  query Profile{
    me {
      email
      name
      phone
      address(limit: 1) {
        addressId
        apt
        street
        zip
        additionalInfo
      }
    }
  }
`);
