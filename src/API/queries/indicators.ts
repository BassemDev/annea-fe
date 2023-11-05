import { gql } from "@apollo/client";

export const GET_INDICATORS = gql`
  query GetIndicators {
    indicators {
      id
      variable
      timestamp
      turbineId
    }
  }
`;

export const GET_INDICATORS_BY_ID = gql`
  query GetIndicatorsById($id: Int!) {
    indicator(id: $id) {
      id
      variable
      timestamp
      turbineId
    }
  }
`;
