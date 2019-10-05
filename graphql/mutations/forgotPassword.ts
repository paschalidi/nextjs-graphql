import gql from "graphql-tag";

export const forgotPasswordMutation = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;
