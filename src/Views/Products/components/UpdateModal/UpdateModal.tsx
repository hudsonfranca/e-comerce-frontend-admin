import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
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
  updateId: number | null;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  setFeedbackData: React.Dispatch<React.SetStateAction<alertValues>>;
  setProducts: React.Dispatch<React.SetStateAction<TableData[]>>;
}

const UpdateModal: React.FC<Props> = ({
  show,
  setShow,
  updateId,
  setShowFeedback,
  setFeedbackData,
  setProducts
}) => {
  const [formValues, setFormValues] = useState<TableData | null>(null);

  function handleClose(): void {
    setShow(false);
    setFormValues(null);
  }

  useEffect(() => {
    async function loadCustomer() {
      if (updateId) {
        const { data } = await api.get(`/api/customer/${updateId}`);
        setFormValues(data);
      }
    }
    loadCustomer();
  }, [updateId]);

  const initialValues = {
    id: formValues?.id,
    name: formValues?.name,
    description: formValues?.description,
    price: formValues?.price,
    status: formValues?.status,
    Images: formValues?.Images,
    Brand: formValues?.Brand
  };

  return (
    formValues && (
      <Modal
        size="lg"
        show={show}
        onHide={() => handleClose()}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Update Customer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
      </Modal>
    )
  );
};

export default UpdateModal;
