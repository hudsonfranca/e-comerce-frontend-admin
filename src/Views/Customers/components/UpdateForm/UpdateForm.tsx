import React from "react";
import { Formik, FormikProps } from "formik";
import { Form, InputGroup, Col, Button, Spinner } from "react-bootstrap";
import * as yup from "yup";
import api from "../../../../services/Api";

interface FormValues {
  first_name: string | undefined;
  last_name: string | undefined;
  email_address: string | undefined;
  cpf: string | undefined;
  phone_number: string | undefined;
  street_address: string | undefined;
  city: string | undefined;
  zip: string | undefined;
  country: string | undefined;
  state: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
}

interface Props {
  initialValues: FormValues;
  customerId: number | null;
  addressesId: number | null;
  handleCloseModal: () => void;
}

const schema = yup.object({
  first_name: yup
    .string()
    .required()
    .min(1)
    .max(50)
    .label("First name"),
  last_name: yup
    .string()
    .required()
    .min(1)
    .max(50)
    .label("Last name"),
  email_address: yup
    .string()
    .required()
    .email()
    .label("Email address"),
  cpf: yup
    .string()
    .required()
    .min(11)
    .max(11)
    .label("Cpf"),
  phone_number: yup
    .string()
    .required()
    .min(1)
    .max(20)
    .label("Phone Number"),
  street_address: yup
    .string()
    .required()
    .min(1)
    .max(150)
    .label("Street address"),
  city: yup
    .string()
    .required()
    .min(1)
    .max(100)
    .label("City"),
  zip: yup
    .string()
    .required()
    .min(5)
    .max(10)
    .label("Zip"),
  country: yup
    .string()
    .required()
    .min(1)
    .max(40)
    .label("Country"),
  state: yup
    .string()
    .required()
    .min(1)
    .max(40)
    .label("State"),
  password: yup
    .string()
    .required()
    .min(8)
    .label("Password"),
  confirmPassword: yup
    .string()
    .required()
    .min(8)
    .label("Confirm password")
    .test(
      "password-match",
      "Confirm Password & Password must be same.",
      function(value) {
        return this.parent.password === value;
      }
    )
});

const UpdateForm: React.FC<Props> = ({
  initialValues,
  customerId,
  addressesId,
  handleCloseModal
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={async (values: FormValues, { setSubmitting, resetForm }) => {
        try {
          const response = await api.put(
            `/api/customer/${customerId}/addresses/${addressesId}/edit`,
            values
          );

          resetForm({});
          if (response) {
            console.log(response);
            handleCloseModal();
          }
        } catch (err) {
          setSubmitting(false);
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
      }: FormikProps<FormValues>) => (
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group controlId="firstName" as={Col}>
              <Form.Label>First name</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="first_name"
                  value={values.first_name}
                  onChange={handleChange}
                  isValid={touched.first_name && !errors.first_name}
                  isInvalid={!!errors.first_name}
                  onBlur={handleBlur}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.first_name}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="LastName" as={Col}>
              <Form.Label>Last name</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="last_name"
                  value={values.last_name}
                  onChange={handleChange}
                  isValid={touched.last_name && !errors.last_name}
                  isInvalid={!!errors.last_name}
                  onBlur={handleBlur}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.last_name}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group controlId="emailAddress" as={Col}>
              <Form.Label>Email Address</Form.Label>
              <InputGroup>
                <Form.Control
                  type="email"
                  name="email_address"
                  value={values.email_address}
                  onChange={handleChange}
                  isValid={touched.email_address && !errors.email_address}
                  isInvalid={!!errors.email_address}
                  onBlur={handleBlur}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email_address}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="cpf" as={Col}>
              <Form.Label>Cpf</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="cpf"
                  value={values.cpf}
                  onChange={handleChange}
                  isValid={touched.cpf && !errors.cpf}
                  isInvalid={!!errors.cpf}
                  onBlur={handleBlur}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.cpf}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="phoneNumber" as={Col}>
              <Form.Label>Phone number</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="phone_number"
                  value={values.phone_number}
                  onChange={handleChange}
                  isValid={touched.phone_number && !errors.phone_number}
                  isInvalid={!!errors.phone_number}
                  onBlur={handleBlur}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone_number}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group controlId="City" as={Col}>
              <Form.Label>City</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  isValid={touched.city && !errors.city}
                  isInvalid={!!errors.city}
                  onBlur={handleBlur}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="state" as={Col}>
              <Form.Label>State</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                  isValid={touched.state && !errors.state}
                  isInvalid={!!errors.state}
                  onBlur={handleBlur}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.state}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="Zip" as={Col}>
              <Form.Label>Zip</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="zip"
                  value={values.zip}
                  onChange={handleChange}
                  isValid={touched.zip && !errors.zip}
                  isInvalid={!!errors.zip}
                  onBlur={handleBlur}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.zip}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="Country" as={Col}>
              <Form.Label>Country</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="country"
                  value={values.country}
                  onChange={handleChange}
                  isValid={touched.country && !errors.country}
                  isInvalid={!!errors.country}
                  onBlur={handleBlur}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.country}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group controlId="StreetAddress" as={Col}>
              <Form.Label>Street address</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="street_address"
                  value={values.street_address}
                  onChange={handleChange}
                  isValid={touched.street_address && !errors.street_address}
                  isInvalid={!!errors.street_address}
                  onBlur={handleBlur}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.street_address}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group controlId="Password" as={Col}>
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isValid={touched.password && !errors.password}
                  isInvalid={!!errors.password}
                  onBlur={handleBlur}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="confirmPassword" as={Col}>
              <Form.Label>Confirm password</Form.Label>
              <InputGroup>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  isValid={touched.confirmPassword && !errors.confirmPassword}
                  isInvalid={!!errors.confirmPassword}
                  onBlur={handleBlur}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group controlId="submit" as={Col}>
              <InputGroup>
                {isSubmitting ? (
                  <Button variant="secondary" size="lg" disabled block>
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
                    Update
                  </Button>
                )}
              </InputGroup>
            </Form.Group>
          </Form.Row>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateForm;
