import React from "react";
import { NextPageContext } from "next";
import { ApolloClient, NormalizedCacheObject } from "apollo-boost";
import { withApollo } from "../../../lib/apollo";
import { confirmUserMutation } from "../../../graphql/mutations/confirmUser";
import { redirect } from "../../../lib/utils";

interface MyContext extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

class Confirm extends React.PureComponent {
  static async getInitialProps({
    query: { token },
    apolloClient,
    res
  }: MyContext) {
    if (!token) {
      return {};
    }
    await apolloClient.mutate({
      mutation: confirmUserMutation,
      variables: {
        token
      }
    });
    redirect(res, "/location");
    return {};
  }

  render() {
    return null;
  }
}

export default withApollo(Confirm);
