import { gql } from "@apollo/client";

export const DELETE_INDICATOR = gql`
  mutation DeleteIndicator($id: Int!) {
    removeIndicator(id: $id) {
      affected
    }
  }
`;

export const UPDATE_INDICATOR = gql`
  mutation UpdateIndicator($updateIndicatorInput: UpdateIndicatorInput!) {
    updateIndicator(updateIndicatorInput: $updateIndicatorInput) {
      variable
      timestamp
      turbineId
      indicator
    }
  }
`;
