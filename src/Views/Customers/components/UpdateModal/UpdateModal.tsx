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
  customerId: number | null;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  setFeedbackData: React.Dispatch<React.SetStateAction<alertValues>>;
  setCustomers: React.Dispatch<React.SetStateAction<TableData[]>>;
}

interface AddressesFormData {
  id: number;
  street_address: string;
  city: string;
  zip: string;
  country: string;
  state: string;
}

interface FormData {
  id: number;
  first_name: string;
  last_name: string;
  email_address: string;
  cpf: string;
  phone_number: string;
  createdAt: string;
  Addresses: AddressesFormData[];
}

const UpdateModal: React.FC<Props> = ({
  show,
  setShow,
  customerId,
  setShowFeedback,
  setFeedbackData,
  setCustomers
}) => {
  const [formValues, setFormValues] = useState<FormData | null>(null);

  function handleClose(): void {
    setShow(false);
    setFormValues(null);
  }

  useEffect(() => {
    async function loadCustomer() {
      if (customerId) {
        const { data } = await api.get(`/api/customer/${customerId}`);
        setFormValues(data);
      }
    }
    loadCustomer();
  }, [customerId]);

  const initialValues = {
    first_name: formValues?.first_name,
    last_name: formValues?.last_name,
    email_address: formValues?.email_address,
    cpf: formValues?.cpf,
    phone_number: formValues?.phone_number,
    street_address:
      formValues?.Addresses.length !== 0
        ? `${formValues?.Addresses[0].street_address}`
        : "",
    city:
      formValues?.Addresses.length !== 0
        ? `${formValues?.Addresses[0].city}`
        : "",
    zip:
      formValues?.Addresses.length !== 0
        ? `${formValues?.Addresses[0].zip}`
        : "",
    country:
      formValues?.Addresses.length !== 0
        ? `${formValues?.Addresses[0].country}`
        : "",
    state:
      formValues?.Addresses.length !== 0
        ? `${formValues?.Addresses[0].state}`
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
            setCustomers={setCustomers}
            addressesId={
              formValues.Addresses.length !== 0
                ? formValues.Addresses[0].id
                : customerId
            }
            setFeedbackData={setFeedbackData}
            setShowFeedback={setShowFeedback}
          />
        </Modal.Body>
      </Modal>
    )
  );
};

export default UpdateModal;
