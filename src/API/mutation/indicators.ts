import { gql } from "@apollo/client";

export const DELETE_INDICATOR = gql`
  mutation DeleteIndicator($id: Int!) {
    removeIndicator(id: $id) {
      affected
    }
  }
`;
