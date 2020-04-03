import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import UpdateStockForm from "../UpdateStockForm";
import api from "../../../../services/Api";

interface TableData {
  name: string;
  Stock: {
    id: number;
    quantity: number;
    id_product: number;
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
  stockId: number | null;
  productId: number | null;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  setFeedbackData: React.Dispatch<React.SetStateAction<alertValues>>;
  loadAllStock: () => void;
}

export const UpdateStockModal: React.FC<Props> = ({
  show,
  setShow,
  stockId,
  setFeedbackData,
  setShowFeedback,
  productId,
  loadAllStock
}) => {
  const [formValues, setFormValues] = useState<any>(null);
  function handleClose(): void {
    setShow(false);
    setFormValues(null);
  }

  useEffect(() => {
    async function loadStock() {
      if (stockId) {
        const { data } = await api.get(`/api/product/${productId}/stock`);
        setFormValues(data);
      }
    }
    loadStock();
  }, [stockId]);

  const initialValues: { quantity: number } = {
    quantity: formValues?.Stock.quantity
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
            Update stock
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateStockForm
            loadStock={loadAllStock}
            setFeedbackData={setFeedbackData}
            setShowFeedback={setShowFeedback}
            handleCloseModal={handleClose}
            stockId={stockId}
            initialValues={initialValues}
          />
        </Modal.Body>
      </Modal>
    )
  );
};

export default UpdateStockModal;
