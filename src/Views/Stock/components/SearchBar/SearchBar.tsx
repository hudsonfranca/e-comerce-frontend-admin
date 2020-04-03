import React, { useState } from "react";
import { Form, FormControl, Button, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import api from "../../../../services/Api";

interface TableData {
  name: string;
  Stock: {
    id: number;
    quantity: number;
    id_product: number;
  };
}

interface Props {
  setStock: React.Dispatch<React.SetStateAction<TableData[]>>;
}

const schema = yup.object({
  id: yup
    .number()
    .typeError("must be a number")
    .label("Id")
});

const SearchBar: React.FC<Props> = ({ setStock }) => {
  return (
    <Formik
      initialValues={{ id: "" }}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const arr = [];

        if (parseInt(values.id) > 0) {
          const { data } = await api.get(`/api/product/${values.id}/stock`);

          if (data !== null && data !== undefined) {
            console.log(data);

            arr.push(data);

            setStock(arr);
          }
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
        <nav className="navbar navbar-light bg-light p-4">
          <Form inline onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <FormControl
                  value={values.id}
                  type="text"
                  placeholder="Product id"
                  className=" mr-sm-2"
                  isInvalid={!!errors.id}
                  isValid={touched.id && !errors.id}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="id"
                />

                <Button type="submit">Search Stock</Button>
              </Form.Group>
            </Form.Row>
          </Form>
        </nav>
      )}
    </Formik>
  );
};

export default SearchBar;
