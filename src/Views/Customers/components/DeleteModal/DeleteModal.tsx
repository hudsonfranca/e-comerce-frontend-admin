import React, { useState } from "react";
import { Button, Modal, Alert } from "react-bootstrap";
import api from "../../../../services/Api";

interface Props {
  deleteId: number | null;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteModal: React.FC<Props> = ({ show, setShow, deleteId }) => {
  const [active, setActive] = useState(true);

  const handleClose = () => setShow(false);

  async function hadleDeleteModal(id: number | null) {
    try {
      setActive(false);
      await api.delete(`/api/customer/${id}`);
      setActive(true);
    } catch (err) {
      alert("Não foi possível deletar. ");
    }
    handleClose();
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
          <Button
            variant="danger"
            onClick={() => hadleDeleteModal(deleteId)}
            active={active}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
