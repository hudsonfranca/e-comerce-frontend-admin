import React, { useState, useEffect } from "react";

import { Form, Col, Button, Spinner } from "react-bootstrap";
import { Formik, FormikProps } from "formik";
import api from "../../../../services/Api";
import * as yup from "yup";
import "../../../../styles/css/AddProductForm.css";

const schema = yup.object({
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .required()
    .label("Quantity"),
  id_product: yup
    .number()
    .typeError("Product id must be a number")
    .required()
    .label("product id")
});

interface TableData {
  id: number;
  quantity: number;
  id_product: number;
  Products: {
    name: string;
  };
}

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
  setStock: React.Dispatch<React.SetStateAction<TableData[]>>;
}

export const AddProductForm: React.FC<Props> = ({
  handleCloseModal,
  setStock,
  setFeedbackData,
  setShowFeedback
}) => {
  const initialValues = {
    quantity: "",
    id_product: ""
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          setSubmitting(true);
          const { data } = await api.post(
            `/api/product/${values.id_product}/stock`,
            values
          );

          if (data) {
            setFeedbackData({
              message: "The stock has been successfully registered.",
              variant: "success"
            });
            setShowFeedback(true);
            resetForm({});
            setSubmitting(false);
            handleCloseModal();
            const loadStock = async () => {
              const { data } = await api.get("/api/stock");

              setStock(data);
            };
            loadStock();
          }
        } catch (err) {
          setFeedbackData({
            message: "It was not possible to register this stock.",
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

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Product id</Form.Label>
              <Form.Control
                type="text"
                placeholder="product id"
                name="id_product"
                value={values.id_product}
                onChange={handleChange}
                isValid={touched.id_product && !errors.id_product}
                isInvalid={!!errors.id_product}
                onBlur={handleBlur}
              />

              <Form.Control.Feedback type="invalid">
                {errors.id_product}
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
                Add Product
              </Button>
            )}
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
};

export default AddProductForm;
