import { gql } from '@apollo/client';

export const PUT_ADDRESS_MUTATION = gql`
  mutation (
    $name: String!
    $email: String!
    $phone: String!
    $apartmentNumber: Int
    $city: String!
    $street: String!
    $zip: String!
    $state: String!
    $country: String!
    $additionalInfo: String
  ) {
    putAddress(
      putAddressInput: {
        apartmentNumber: $apartmentNumber
        city: $city
        street: $street
        zip: $zip
        state: $state
        country: $country
        additionalInfo: $additionalInfo
      }
    ) {
      userId
    }
    updateUser(updateUserInput: { email: $email, name: $name, phone: $phone }) {
      userId
    }
  }
`;

export const ADDRESS_QUERY = gql`
  query {
    me {
      email
      name
      phone
      address {
        apartmentNumber
        street
        zip
      }
    }
  }
`;
