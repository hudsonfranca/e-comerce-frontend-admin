import React from "react";
import { Button, Modal, Alert } from "react-bootstrap";
import api from "../../../../services/Api";

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

interface TableData {
  id: number;
  name: string;
  description: string;
  price: string;
  status: boolean;
  Images: { url: string }[];
  Brand: { id: number; name: string };
}

interface Props {
  deleteId: number | null;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  setFeedbackData: React.Dispatch<React.SetStateAction<alertValues>>;
  setProducts: React.Dispatch<React.SetStateAction<TableData[]>>;
}

const DeleteModal: React.FC<Props> = ({
  show,
  setShow,
  deleteId,
  setFeedbackData,
  setShowFeedback,
  setProducts
}) => {
  const handleClose = () => setShow(false);

  async function hadleDeleteModal(id: number | null) {
    try {
      await api
        .delete(`/api/products/${id}`)
        .then(() => {
          setFeedbackData({
            message: "Product successfully deleted.",
            variant: "success"
          });
          setShowFeedback(true);
          handleClose();
        })
        .then(() => {
          async function loadProducts() {
            const { data } = await api.get("/api/products");

            setProducts(data);
          }
          loadProducts();
        });
    } catch (err) {
      setFeedbackData({
        message: "This product could not be deleted.",
        variant: "warning"
      });
      setShowFeedback(true);
      handleClose();
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Danger!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="warning">
            Are you sure you want to delete this product?
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => hadleDeleteModal(deleteId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
