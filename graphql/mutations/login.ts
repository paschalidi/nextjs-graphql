import gql from "graphql-tag";

export const loginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      firstName
      lastName
    }
  }
`;
