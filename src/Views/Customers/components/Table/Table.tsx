import React, { useState } from "react";
import moment from "moment";
import DeleteModal from "../DeleteModal";
import UpdateModal from "../UpdateModal";
import { Table } from "react-bootstrap";

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
  values: TableData[] | null;
  setShowFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  setFeedbackData: React.Dispatch<React.SetStateAction<alertValues>>;
  loadCustomers: () => void;
}

const CustomerTable: React.FC<Props> = ({
  values,
  setFeedbackData,
  setShowFeedback,
  loadCustomers
}) => {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [updateId, setUpdateId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  function hadleDelete(id: number) {
    setDeleteId(id);
    setShowDeleteModal(true);
  }

  function hadleUpdate(id: number) {
    setUpdateId(id);
    setShowUpdateModal(true);
  }

  return (
    <>
      <DeleteModal
        deleteId={deleteId}
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        setFeedbackData={setFeedbackData}
        setShowFeedback={setShowFeedback}
        loadCustomers={loadCustomers}
      />
      <UpdateModal
        customerId={updateId}
        show={showUpdateModal}
        setShow={setShowUpdateModal}
        setFeedbackData={setFeedbackData}
        setShowFeedback={setShowFeedback}
        loadCustomers={loadCustomers}
      />

      <Table striped bordered responsive="sm" size="sm">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">CPF</th>
            <th scope="col">Phone</th>
            <th scope="col">Location</th>
            <th scope="col">Registration date</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {values &&
            values.map((data: TableData) => (
              <tr key={data.id}>
                <th scope="row">{data.id}</th>
                <td>{`${data.User.first_name} ${data.User.last_name}`}</td>
                <td>{data.User.email_address}</td>
                <td>{data.User.cpf}</td>
                <td>{data.User.phone_number}</td>
                <td>
                  {data.User.Addresses
                    ? `${data.User.Addresses.street_address}, ${data.User.Addresses.city}, ${data.User.Addresses.state}`
                    : ""}
                </td>
                <td>{moment(data.User.createdAt).format("DD/MM/YYYY")}</td>
                <td>
                  <p>
                    <button
                      className="btn btn-primary btn-xs"
                      onClick={() => hadleUpdate(data.id)}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                  </p>
                </td>
                <td>
                  <p>
                    <button
                      className="btn btn-danger btn-xs"
                      onClick={() => hadleDelete(data.id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </p>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default CustomerTable;
