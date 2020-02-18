import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import UpdateProductForm from "../UpdateProductForm";
import api from "../../../../services/Api";

interface FormValues {
  id: number | undefined;
  name: string | undefined;
  description: string | undefined;
  price: string | undefined;
  status: string | undefined;
  Brand: { id: string; name: string } | undefined;
  Categories: { id: number; name: string }[] | undefined;
  Images: { url: string }[] | undefined;
}

interface TableData {
  id: number;
  name: string;
  description: string;
  price: string;
  status: boolean;
  Images: { url: string }[];
  Brand: { id: number; name: string };
}

interface InitialValues {
  id: number | undefined;
  name: string | undefined;
  description: string | undefined;
  price: string | undefined;
  status: string | undefined;
  Brand: { id: string; name: string } | undefined;
  Categories: { id: number; name: string } | undefined;
  Images: { url: string }[] | undefined;
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
  updateId: number | null;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  setFeedbackData: React.Dispatch<React.SetStateAction<alertValues>>;
  setProducts: React.Dispatch<React.SetStateAction<TableData[]>>;
}

export const UpdateProductModal: React.FC<Props> = ({
  show,
  setShow,
  updateId,
  setFeedbackData,
  setProducts,
  setShowFeedback
}) => {
  const [formValues, setFormValues] = useState<any>(null);
  function handleClose(): void {
    setShow(false);
    setFormValues(null);
  }

  useEffect(() => {
    async function loadProduct() {
      if (updateId) {
        const { data } = await api.get(`/api/products/${updateId}`);
        setFormValues(data);
      }
    }
    loadProduct();
  }, [updateId]);

  const initialValues: any = {
    name: formValues?.name,
    description: formValues?.description,
    price: formValues?.price,
    status: "",
    brand_id: "",
    Categories: ""
  };

  return (
    formValues && (
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Update Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateProductForm
            setFeedbackData={setFeedbackData}
            setProducts={setProducts}
            setShowFeedback={setShowFeedback}
            handleCloseModal={handleClose}
            initialValues={initialValues}
            updateId={updateId}
          />
        </Modal.Body>
      </Modal>
    )
  );
};

export default UpdateProductModal;
