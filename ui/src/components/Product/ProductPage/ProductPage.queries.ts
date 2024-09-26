import { gql } from "@apollo/client";

export const VALIDATE_USER = gql`
  query {
    products {
      id
      name
      price
      description
      imageUrl
      quantity
      category
      badgeText
      maxQuantity
      rating
      tags
    }
  }
`;
