import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import UpdateForm from "../UpdateForm";
import api from "../../../../services/Api";

interface Props {
  customerId: number | null;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Addresses {
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
  Addresses: Addresses[];
}

const UpdateModal: React.FC<Props> = ({ show, setShow, customerId }) => {
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
    street_address: formValues?.Addresses[0].street_address,
    city: formValues?.Addresses[0].city,
    zip: formValues?.Addresses[0].zip,
    country: formValues?.Addresses[0].country,
    state: formValues?.Addresses[0].state,
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
            addressesId={formValues.Addresses[0].id}
          />
        </Modal.Body>
      </Modal>
    )
  );
};

export default UpdateModal;
