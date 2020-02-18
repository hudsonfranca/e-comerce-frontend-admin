import React from "react";
import { Modal } from "react-bootstrap";
import AddProductForm from "../AddStockForm";

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
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  setFeedbackData: React.Dispatch<React.SetStateAction<alertValues>>;
  setStock: React.Dispatch<React.SetStateAction<TableData[]>>;
}

export const AddStockModal: React.FC<Props> = ({
  show,
  setShow,
  setFeedbackData,
  setStock,
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
          setStock={setStock}
          setShowFeedback={setShowFeedback}
          handleCloseModal={handleClose}
        />
      </Modal.Body>
    </Modal>
  );
};

export default AddStockModal;
