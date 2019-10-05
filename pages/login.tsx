import React, { useState } from "react";
import Layout from "../components/Layout";
import { Field, Formik } from "formik";
import InputField from "../components/InputField";
import { LoginComponent } from "../generated/apollocComponents";
import { withApollo } from "../lib/apollo";
import Router from "next/router";

export default withApollo(() => {
  const [isDisabled, setDisabled] = useState(false);
  return (
    <Layout title="Register Page">
      <LoginComponent>
        {login => (
          <Formik
            validateOnBlur={false}
            onSubmit={async (data, { setErrors }) => {
              setDisabled(true);

              const response = await login({ variables: data });
              if (response && response.data && !response.data.login) {
                setDisabled(false);
                setErrors({ email: "Invalid credentials" });
                return;
              }

              Router.push("/");
            }}
            initialValues={{
              email: "",
              password: ""
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="email"
                  placeholder="email"
                  component={InputField}
                />
                <Field
                  name="password"
                  placeholder="password"
                  type="password"
                  component={InputField}
                />
                <button disabled={isDisabled} type="submit">
                  submit
                </button>
              </form>
            )}
          </Formik>
        )}
      </LoginComponent>
    </Layout>
  );
});
