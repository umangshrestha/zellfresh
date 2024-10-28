import { gql } from '@apollo/client';

export const PUT_ADDRESS_MUTATION = gql`
  mutation (
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
  }
`;

export const ADDRESS_QUERY = gql`
  query {
    me {
      address {
        apartmentNumber
        street
        zip
      }
    }
  }
`;
