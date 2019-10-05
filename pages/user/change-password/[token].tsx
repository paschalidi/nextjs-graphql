import React, { useState } from "react";
import Layout from "../../../components/Layout";
import { Field, Formik } from "formik";
import InputField from "../../../components/InputField";
import { ChangePasswordComponent } from "../../../generated/apollocComponents";
import { withApollo } from "../../../lib/apollo";
import Router, { withRouter } from "next/router";


const ChangePasswordToken = ({ router }: any) => {
  const [isDisabled, setDisabled] = useState(false);
  return (
    <Layout title="Register Page">
      <ChangePasswordComponent>
        {changePassword => (
          <Formik
            validateOnBlur={false}
            onSubmit={async ({ password }, { setErrors }) => {
              if (password && router && router.query && router.query.token) {
                setDisabled(true);
                const { token } = router.query;
                const response = await changePassword({
                  variables: {
                    data: {
                      password,
                      token
                    }
                  }
                });
                setDisabled(false);

                if (
                  response &&
                  response.data &&
                  !response.data.changePassword
                ) {
                  setErrors({ password: "Token has expired" });
                }

                if (response && response.data && response.data.changePassword) {
                  Router.push("/login");
                }

                return;
              }
            }}
            initialValues={{
              email: "",
              password: ""
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  type="password"
                  name="password"
                  placeholder="new password"
                  component={InputField}
                />
                <button disabled={isDisabled} type="submit">
                  submit
                </button>
              </form>
            )}
          </Formik>
        )}
      </ChangePasswordComponent>
    </Layout>
  );
};

export default withApollo(withRouter(ChangePasswordToken));
