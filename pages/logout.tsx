import React from "react";
import { NextPageContext } from "next";
import { ApolloClient, NormalizedCacheObject } from "apollo-boost";
import { withApollo } from "../lib/apollo";
import { logoutMutation } from "../graphql/mutations/logout";
import { redirect } from "../lib/utils";

interface MyContext extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

class Confirm extends React.PureComponent {
  static async getInitialProps({ res, apolloClient }: MyContext) {
    await apolloClient.mutate({ mutation: logoutMutation });
    await apolloClient.resetStore();
    redirect(res, "/login");
    return {};
  }

  render() {
    return null;
  }
}

export default withApollo(Confirm);
