import React, { useState, useEffect } from "react";

import { Form, Col, Button, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import api from "../../../../services/Api";
import UploadFile from "../UploadFile";
import * as yup from "yup";
import "../../../../styles/css/UpdateProductForm.css";

const schema = yup.object({
  name: yup
    .string()
    .required()
    .label("Name"),
  description: yup
    .string()
    .required()
    .label("Description"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required()
    .label("Price"),
  status: yup
    .string()
    .required()
    .label("Status"),
  brand_id: yup
    .string()
    .required()
    .label("Brand"),
  Categories: yup
    .string()
    .required()
    .label("Categorie")
});

interface TableData {
  id: number;
  name: string;
  description: string;
  price: string;
  status: boolean;
  Images: { url: string }[];
  Brand: { id: number; name: string };
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

type CategorieType = { id: number; name: string }[] | null;

interface Props {
  handleCloseModal: () => void;
  setShowFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  setFeedbackData: React.Dispatch<React.SetStateAction<alertValues>>;
  setProducts: React.Dispatch<React.SetStateAction<TableData[]>>;
  initialValues: any;
  updateId: number | null;
}

export const AddProductForm: React.FC<Props> = ({
  handleCloseModal,
  setProducts,
  setFeedbackData,
  setShowFeedback,
  initialValues,
  updateId
}) => {
  const [brand, setBrand] = useState<{ id: number; name: string }[] | null>(
    null
  );
  const [categories, setCategories] = useState<CategorieType>(null);

  useEffect(() => {
    async function loadBrands() {
      const { data } = await api.get("/api/brands");
      setBrand(data);
    }
    loadBrands();
  }, []);

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get("/api/categories");
      setCategories(data);
    }
    loadCategories();
  }, []);

  const [files, setFiles] = useState<any>([]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={async (values: any, { setSubmitting, resetForm }) => {
        console.log(values);
        try {
          setSubmitting(true);
          const { data } = await api.put(
            `/api/products/${updateId}/edit`,
            values
          );

          let uploadImagesPromisses: any = [];

          if (data && !!files.length) {
            files.map(async (uploadedFile: any) => {
              const imageFormData = new FormData();
              imageFormData.append("photos", uploadedFile.file);

              uploadImagesPromisses.push(
                api.post(`/api/product/${updateId}/images`, imageFormData)
              );
            });
            Promise.all(uploadImagesPromisses).then((response: any) => {
              setFeedbackData({
                message: "The product has been successfully update.",
                variant: "success"
              });
              setShowFeedback(true);
              resetForm({});
              setSubmitting(false);
              handleCloseModal();
              async function loadproducts() {
                const { data } = await api.get("/api/products");

                setProducts(data);
              }
              loadproducts();
            });
          } else if (data && !files.length) {
            setFeedbackData({
              message: "The product has been successfully update.",
              variant: "success"
            });
            setShowFeedback(true);
            resetForm({});
            setSubmitting(false);
            handleCloseModal();
            const loadproducts: any = async () => {
              const { data } = await api.get("/api/products");

              setProducts(data);
            };
            loadproducts();
          }
        } catch (err) {
          setFeedbackData({
            message: "It was not possible to update the data for this product.",
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
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={values.name}
                isInvalid={!!errors.name}
                isValid={touched.name && !errors.name}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Price"
                name="price"
                value={values.price}
                onChange={handleChange}
                isValid={touched.price && !errors.price}
                isInvalid={!!errors.price}
                onBlur={handleBlur}
              />

              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                as="select"
                name="brand_id"
                value={values.brand_id}
                onChange={handleChange}
                isValid={touched.brand_id && !errors.brand_id}
                isInvalid={!!errors.brand_id}
                onBlur={handleBlur}
              >
                <option>Brand...</option>
                {brand &&
                  brand.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.brand_id}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Categorie</Form.Label>
              <Form.Control
                as="select"
                name="Categories"
                value={values.Categories}
                onChange={handleChange}
                isValid={touched.Categories && !errors.Categories}
                isInvalid={!!errors.Categories}
                onBlur={handleBlur}
              >
                <option>Categorie...</option>
                {categories &&
                  categories.map(({ name, id }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.Categories}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={values.status}
                onChange={handleChange}
                isValid={touched.status && !errors.status}
                isInvalid={!!errors.status}
                onBlur={handleBlur}
              >
                <option>Status</option>
                <option value="true">Available</option>
                <option value="false">Out of stock</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.status}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              size="lg"
              value={values.description}
              onChange={handleChange}
              isValid={touched.description && !errors.description}
              isInvalid={!!errors.description}
              onBlur={handleBlur}
              name="description"
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <UploadFile files={files} setFiles={setFiles} updateId={updateId} />
          </Form.Group>
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

export default AddProductForm;
