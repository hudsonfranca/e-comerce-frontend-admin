import React, { useState, useEffect } from "react";
import { Form, Col, Button, Spinner } from "react-bootstrap";
import NumberFormat from 'react-number-format';
import { Formik, FormikProps } from "formik";
import api from "../../../../services/Api";
import UploadFile from "../UploadFile";
import * as yup from "yup";
import "../../../../styles/css/AddProductForm.css";

const schema = yup.object({
  name: yup.string().required().label("Name"),
  description: yup.string().required().label("Description"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required()
    .label("Price"),
  status: yup.string().required().label("Status"),
  brand_id: yup.number().required().label("Brand"),
  categorie_id: yup.string().required().label("Categorie"),
  quantity: yup.number().required().min(0).label("Quantity"),
});

interface ProductValues {
  name: string;
  description: string;
  price: string;
  status: string;
  brand_id: string;
  categorie_id: string;
  quantity: string;
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

  loadproducts: () => void;
}

export const AddProductForm: React.FC<Props> = ({
  handleCloseModal,

  setFeedbackData,
  setShowFeedback,
  loadproducts,
}) => {
  const [brand, setBrand] = useState<{ id: number; name: string }[]>();
  const [categories, setCategories] = useState<
    { id: number; name: string }[]
  >();

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

  const initialValues = {
    name: "",
    description: "",
    price: "",
    status: "",
    brand_id: "",
    categorie_id: "",
    quantity: "",
  };

  const [files, setFiles] = useState<any>([]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={async (values: ProductValues, { setSubmitting, resetForm }) => {
        try {
          setSubmitting(true);
          const { data } = await api.post(`/api/products`, values);

          let uploadImagesPromisses: any = [];

          if (data) {
            files.map(async (uploadedFile: any) => {
              const imageFormData = new FormData();
              imageFormData.append("image", uploadedFile.file);

              uploadImagesPromisses.push(
                api.post(
                  `/api/product/${data.id}/images/${uploadedFile.aspectRatio}`,
                  imageFormData
                )
              );
            });
            Promise.all(uploadImagesPromisses).then((response: any) => {
              setFeedbackData({
                message: "The product has been successfully registered.",
                variant: "success",
              });
              setShowFeedback(true);
              resetForm({});
              setSubmitting(false);
              handleCloseModal();
              loadproducts();
            });
          }
        } catch (err) {
          setFeedbackData({
            message: "It was not possible to register this product.",
            variant: "danger",
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
        isSubmitting,
      }: FormikProps<ProductValues>) => (
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

          <NumberFormat
          customInput={Form.Control}
            decimalSeparator={'.'}
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
                name="categorie_id"
                value={values.categorie_id}
                onChange={handleChange}
                isValid={touched.categorie_id && !errors.categorie_id}
                isInvalid={!!errors.categorie_id}
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
                {errors.categorie_id}
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
            <UploadFile files={files} setFiles={setFiles} />
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
