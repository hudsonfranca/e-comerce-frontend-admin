import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import UpdateForm from "../UpdateForm";
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
  id: number;
  street_address: string;
  city: string;
  zip: string;
  country: string;
  state: string;
}

interface TableData {
  id: number;
  User: {
    first_name: string;
    last_name: string;
    email_address: string;
    cpf: string;
    phone_number: string;
    createdAt: string;
    Addresses: Addresses;
  };
}

interface Props {
  customerId: number | null;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  setFeedbackData: React.Dispatch<React.SetStateAction<alertValues>>;

  loadCustomers: () => void;
}

const UpdateModal: React.FC<Props> = ({
  show,
  setShow,
  customerId,
  setShowFeedback,
  setFeedbackData,
  loadCustomers
}) => {
  const [formValues, setFormValues] = useState<TableData | null>(null);

  function handleClose(): void {
    setShow(false);
    setFormValues(null);
  }

  useEffect(() => {
    async function loadCustomerInitialValues() {
      if (customerId) {
        const { data } = await api.get(`/api/customer/${customerId}/show`);
        setFormValues(data);
      }
    }
    loadCustomerInitialValues();
  }, [customerId]);

  const initialValues = {
    first_name: formValues?.User.first_name,
    last_name: formValues?.User.last_name,
    email_address: formValues?.User.email_address,
    cpf: formValues?.User.cpf,
    phone_number: formValues?.User.phone_number,
    street_address: formValues?.User.Addresses
      ? `${formValues?.User.Addresses.street_address}`
      : "",
    city: formValues?.User.Addresses
      ? `${formValues?.User.Addresses.city}`
      : "",
    zip: formValues?.User.Addresses ? `${formValues?.User.Addresses.zip}` : "",
    country: formValues?.User.Addresses
      ? `${formValues?.User.Addresses.country}`
      : "",
    state: formValues?.User.Addresses
      ? `${formValues?.User.Addresses.state}`
      : "",
    password: "",
    confirmPassword: ""
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
        <Modal.Body>
          <UpdateForm
            handleCloseModal={handleClose}
            customerId={customerId}
            initialValues={initialValues}
            setFeedbackData={setFeedbackData}
            setShowFeedback={setShowFeedback}
            loadCustomers={loadCustomers}
          />
        </Modal.Body>
      </Modal>
    )
  );
};

export default UpdateModal;
