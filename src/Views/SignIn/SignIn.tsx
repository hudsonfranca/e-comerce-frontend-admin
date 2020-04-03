import React, { useEffect, useContext } from "react";
import { navbarContext } from "../../NavbarContext";
import api from "../../services/Api";
import { RouteComponentProps } from "react-router-dom";
import { Formik } from "formik";

import { Form, Col, Button, Spinner } from "react-bootstrap";
import * as yup from "yup";
import "../../styles/css/SignIn.css";

const schema = yup.object({
  email_address: yup
    .string()
    .email("Email address must be a valid email")
    .lowercase()
    .required("Email address is a required field"),
  password: yup
    .string()
    .min(8)
    .required("Password is a required field")
});

const initialValues = {
  email_address: "",
  password: ""
};

const SignIn: React.FC<RouteComponentProps> = ({ history }) => {
  const { setShowNavItems } = useContext(navbarContext);

  useEffect(() => {
    if (sessionStorage.getItem("authorization")) {
      history.push("/customers");
    } else {
      setShowNavItems(false);
      document.title = "Sign in";
    }
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={async (data, { setSubmitting, resetForm }) => {
        try {
          const response = await api.post("/api/sessions", {
            email_address: data.email_address,
            password: data.password
          });

          if (response.data) {
            sessionStorage.setItem("authorization", response.data.access_token);

            sessionStorage.setItem("id", response.data.user.id);

            setSubmitting(false);
            resetForm();
            history.push("/customers");
          }
        } catch (err) {
          console.log(err);
        }
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        handleReset,
        values,
        touched,
        isValid,
        errors,
        isSubmitting
      }) => (
        <div className="signIn_Page">
          <Form className="signIn_form" onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Email Address"
                  name="email_address"
                  value={values.email_address}
                  isInvalid={!!errors.email_address}
                  isValid={touched.email_address && !errors.email_address}
                  onBlur={handleBlur}
                  onChange={handleChange}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.email_address}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  isInvalid={!!errors.password}
                  isValid={touched.password && !errors.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridPassword">
                {isSubmitting ? (
                  <Button variant="primary" size="lg" disabled block>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    active
                    block
                  >
                    Sign in
                  </Button>
                )}
              </Form.Group>
            </Form.Row>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default SignIn;
