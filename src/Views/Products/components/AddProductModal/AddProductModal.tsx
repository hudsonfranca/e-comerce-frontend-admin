import React from "react";
import { Modal } from "react-bootstrap";
import AddProductForm from "../AddProductForm";

interface FormValues {
  name: string;
  description: string;
  price: string;
  status: string;
  brand_id: string;
  categorie: string;
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
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  setFeedbackData: React.Dispatch<React.SetStateAction<alertValues>>;
  setProducts: React.Dispatch<React.SetStateAction<TableData[]>>;
}

export const AddProductModal: React.FC<Props> = ({
  show,
  setShow,
  setFeedbackData,
  setProducts,
  setShowFeedback
}) => {
  function handleClose(): void {
    setShow(false);
  }

  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddProductForm
          setFeedbackData={setFeedbackData}
          setProducts={setProducts}
          setShowFeedback={setShowFeedback}
          handleCloseModal={handleClose}
        />
      </Modal.Body>
    </Modal>
  );
};

export default AddProductModal;
