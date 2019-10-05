import gql from "graphql-tag";

export const confirmUserMutation = gql`
  mutation ConfirmUser($token: String!) {
    confirmUser(token: $token)
  }
`;
