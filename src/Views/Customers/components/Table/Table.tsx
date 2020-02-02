import React, { useState } from "react";
import moment from "moment";
import DeleteModal from "../DeleteModal";
import UpdateModal from "../UpdateModal";
import { Table } from "react-bootstrap";

interface Addresses {
  street_address: string;
  city: string;
  zip: string;
  country: string;
  state: string;
}

type Addre = Addresses[];

interface TableData {
  id: number;
  first_name: string;
  last_name: string;
  email_address: string;
  cpf: string;
  phone_number: string;
  createdAt: string;
  Addresses: Addre;
}

interface Props {
  values: TableData[] | null;
}

const CustomerTable: React.FC<Props> = ({ values }) => {
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
      />
      <UpdateModal
        customerId={updateId}
        show={showUpdateModal}
        setShow={setShowUpdateModal}
      />

      <Table striped bordered responsive="sm" size="sm">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">CPF</th>
            <th scope="col">Phone</th>
            <th scope="col">Addresses</th>
            <th scope="col">Date</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {values &&
            values.map(data => (
              <tr key={data.id}>
                <th scope="row">{data.id}</th>
                <td>{`${data.first_name} ${data.last_name}`}</td>
                <td>{data.email_address}</td>
                <td>{data.cpf}</td>
                <td>{data.phone_number}</td>
                <td>{`${data.Addresses[0].street_address}, ${data.Addresses[0].city}, ${data.Addresses[0].state}`}</td>
                <td>{moment(data.createdAt).format("DD/MM/YYYY")}</td>
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
