import React, { useState } from "react";
import Layout from "../components/Layout";
import { Field, Formik } from "formik";
import InputField from "../components/InputField";
import { ForgotPasswordComponent } from "../generated/apollocComponents";
import { withApollo } from "../lib/apollo";
import Router from "next/router";

const ForgotPassword = () => {
  const [isDisabled, setDisabled] = useState(false);
  return (
    <Layout title="Register Page">
      <ForgotPasswordComponent>
        {forgotPassword => (
          <Formik
            validateOnBlur={false}
            onSubmit={async ({ email }) => {
              setDisabled(true);
              await forgotPassword({ variables: { email } });
              Router.push("/check-email");
            }}
            initialValues={{
              email: ""
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="email"
                  placeholder="email"
                  component={InputField}
                />
                <button disabled={isDisabled} type="submit">
                  submit
                </button>
              </form>
            )}
          </Formik>
        )}
      </ForgotPasswordComponent>
    </Layout>
  );
};

export default withApollo(ForgotPassword);
