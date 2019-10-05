import * as React from "react";
import Layout from "../components/Layout";
import { NextPage } from "next";
import { withApollo } from "../lib/apollo";
import { MeComponent } from "../generated/apollocComponents";

const IndexPage: NextPage = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <MeComponent>
        {({ data, loading }) => {
          if (loading) {
            return <h1>Loading...</h1>;
          }
          if (data && data.me && data.me.name) {
            const { name } = data.me;
            return <h1>Logged in as {name}</h1>;
          }

          return <h1>Please Login</h1>;
        }}
      </MeComponent>
    </Layout>
  );
};

export default withApollo(IndexPage);
