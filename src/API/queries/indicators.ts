import { gql } from "@apollo/client";

export const GET_INDICATORS = gql`
  query GetIndicators {
    indicators {
      variable
      timestamp
      turbineId
    }
  }
`;
