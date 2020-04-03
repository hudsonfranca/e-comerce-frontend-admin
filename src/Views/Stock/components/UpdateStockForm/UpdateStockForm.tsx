import React from "react";

import { Form, Col, Button, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import api from "../../../../services/Api";
import * as yup from "yup";
import "../../../../styles/css/UpdateStockForm.css";

const schema = yup.object({
  quantity: yup
    .number()
    .required()
    .label("Quantity")
});

interface alertValues {
  variant:
    | "danger"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "info"
    | "dark"
    | "light"
    | undefined;
  message: string;
}

interface Props {
  handleCloseModal: () => void;
  setShowFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  setFeedbackData: React.Dispatch<React.SetStateAction<alertValues>>;
  initialValues: { quantity: number };
  stockId: number | null;
  loadStock: () => void;
}

export const UpdateProductForm: React.FC<Props> = ({
  handleCloseModal,
  setFeedbackData,
  setShowFeedback,
  initialValues,
  stockId,
  loadStock
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={async (values: any, { setSubmitting, resetForm }) => {
        try {
          setSubmitting(true);
          const { data } = await api.put(`/api/stock/${stockId}/edit`, {
            quantity: values.quantity
          });

          if (data) {
            setFeedbackData({
              message: "The stock has been successfully update.",
              variant: "success"
            });
            setShowFeedback(true);
            resetForm({});
            setSubmitting(false);
            handleCloseModal();
            loadStock();
          }
        } catch (err) {
          setFeedbackData({
            message: "It was not possible to update the data for this stock.",
            variant: "danger"
          });
          setShowFeedback(true);
          resetForm({});
          setSubmitting(false);
          handleCloseModal();
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
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                placeholder="Quantity"
                name="quantity"
                value={values.quantity}
                isInvalid={!!errors.quantity}
                isValid={touched.quantity && !errors.quantity}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.quantity}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Group>
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
              <Button type="submit" variant="primary" size="lg" active block>
                Update
              </Button>
            )}
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateProductForm;
