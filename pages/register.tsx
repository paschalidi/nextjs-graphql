import React, { useState } from "react";
import Layout from "../components/Layout";
import { Field, Formik } from "formik";
import InputField from "../components/InputField";
import { RegisterComponent } from "../generated/apollocComponents";
import { withApollo } from "../lib/apollo";
import Router from "next/router";

interface ValidationErrors {
  constraints: [];
  property: string;
}

interface Errors {
  [key: string]: string;
}

const Register = () => {
  const [isDisabled, setDisabled] = useState(false);
  return (
    <Layout title="Register Page">
      <RegisterComponent onCompleted={() => Router.push("/check-email")}>
        {register => (
          <Formik
            validateOnBlur={false}
            onSubmit={async (data, { setErrors }) => {
              try {
                setDisabled(true);
                await register({ variables: { data } });
              } catch (err) {
                const errors: Errors = {};
                if (
                  err.graphQLErrors[0] &&
                  err.graphQLErrors[0].extensions &&
                  err.graphQLErrors[0].extensions.exception &&
                  err.graphQLErrors[0].extensions.exception.validationErrors
                ) {
                  err.graphQLErrors[0].extensions.exception.validationErrors.map(
                    ({ constraints, property }: ValidationErrors) => {
                      Object.values(constraints).forEach(
                        (message: string): void => {
                          errors[property] = message;
                        }
                      );
                    }
                  );
                  setErrors(errors);
                }
                if (
                  err.graphQLErrors[0] &&
                  err.graphQLErrors[0].extensions &&
                  err.graphQLErrors[0].extensions.exception &&
                  err.graphQLErrors[0].extensions.exception.message.includes(
                    "duplicate key value"
                  )
                ) {
                  setErrors({ password: "Something goes wrong" });
                }
              }
            }}
            initialValues={{
              email: "",
              firstName: "",
              lastName: "",
              password: ""
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="firstName"
                  placeholder="firstName"
                  component={InputField}
                />
                <Field
                  name="lastName"
                  placeholder="lastName"
                  component={InputField}
                />
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
      </RegisterComponent>
    </Layout>
  );
};

export default withApollo(Register);
