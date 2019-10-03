import * as React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import { NextPage } from "next";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { withApollo } from "../lib/apollo";

const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
    }
  }
`;
const IndexPage: NextPage = () => {
  const [login] = useMutation(LOGIN_USER);

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Christos! 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
        <button
          onClick={async () => {
            const response = await login({
              variables: {
                email: "email.current.value",
                password: "password.current.value"
              }
            });
            console.log(response);
          }}
        >
          Call login mutation
        </button>
      </p>
    </Layout>
  );
};

export default withApollo(IndexPage);
