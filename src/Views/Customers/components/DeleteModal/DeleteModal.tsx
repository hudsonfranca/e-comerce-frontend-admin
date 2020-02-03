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

interface Addresses {
  street_address: string;
  city: string;
  zip: string;
  country: string;
  state: string;
}

interface TableData {
  id: number;
  first_name: string;
  last_name: string;
  email_address: string;
  cpf: string;
  phone_number: string;
  createdAt: string;
  Addresses: Addresses[];
}

interface Props {
  deleteId: number | null;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  setFeedbackData: React.Dispatch<React.SetStateAction<alertValues>>;
  setCustomers: React.Dispatch<React.SetStateAction<TableData[]>>;
}

const DeleteModal: React.FC<Props> = ({
  show,
  setShow,
  deleteId,
  setFeedbackData,
  setShowFeedback,
  setCustomers
}) => {
  const handleClose = () => setShow(false);

  async function hadleDeleteModal(id: number | null) {
    try {
      await api
        .delete(`/api/customer/${id}`)
        .then(() => {
          setFeedbackData({
            message: "Customer successfully deleted.",
            variant: "success"
          });
          setShowFeedback(true);
          handleClose();
        })
        .then(() => {
          async function loadCustomers() {
            const { data } = await api.get("/api/customer");

            setCustomers(data);
          }
          loadCustomers();
        });
    } catch (err) {
      setFeedbackData({
        message: "It was not possible to delete the customer data.",
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
            Are you sure you want to delete this customer?
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
