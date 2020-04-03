import React from "react";
import { Modal } from "react-bootstrap";
import AddProductForm from "../AddProductForm";

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

  loadproducts: () => void;
}

export const AddProductModal: React.FC<Props> = ({
  show,
  setShow,
  setFeedbackData,

  setShowFeedback,
  loadproducts
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
          setShowFeedback={setShowFeedback}
          handleCloseModal={handleClose}
          loadproducts={loadproducts}
        />
      </Modal.Body>
    </Modal>
  );
};

export default AddProductModal;
