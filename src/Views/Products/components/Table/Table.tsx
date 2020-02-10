import React, { useState } from "react";
import moment from "moment";
import DeleteModal from "../DeleteModal";
import UpdateModal from "../UpdateModal";
import { Table, Badge, Button } from "react-bootstrap";

interface TableData {
  id: number;
  name: string;
  description: string;
  price: string;
  status: boolean;
  Images: { url: string }[];
  Brand: { id: number; name: string };
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
  setProducts: React.Dispatch<React.SetStateAction<TableData[]>>;
}

const CustomerTable: React.FC<Props> = ({
  values,
  setFeedbackData,
  setShowFeedback,
  setProducts
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
        setProducts={setProducts}
      />
      {/* <UpdateModal
        updateId={updateId}
        show={showUpdateModal}
        setShow={setShowUpdateModal}
        setFeedbackData={setFeedbackData}
        setShowFeedback={setShowFeedback}
        setProducts={setProducts}
      /> */}

      <Table
        striped
        bordered
        responsive="sm"
        size="sm"
        style={{ overflowX: "auto" }}
      >
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Status</th>
            <th scope="col">Brand</th>
            <th scope="col">Edit</th>
            <th scope="col">Images</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {values &&
            values.map(data => (
              <tr key={data.id}>
                <th scope="row">{data.id}</th>
                <td>{data.name}</td>
                <td style={{ width: "40%" }}>{data.description}</td>
                <td>{data.price}</td>
                <td style={{ textAlign: "center" }}>
                  {data.status ? (
                    <h3>
                      <Badge variant="success">Available</Badge>
                    </h3>
                  ) : (
                    <h3>
                      <Badge variant="danger">Out of stock</Badge>
                    </h3>
                  )}
                </td>
                <td>{data.Brand.name}</td>
                <td>
                  <p>
                    <Button
                      variant="primary"
                      onClick={() => hadleUpdate(data.id)}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </Button>
                  </p>
                </td>
                <td>
                  <p>
                    <Button variant="warning">
                      <i
                        className="fas fa-images"
                        style={{ color: "white" }}
                      ></i>
                    </Button>
                  </p>
                </td>
                <td>
                  <p>
                    <Button
                      variant="danger"
                      onClick={() => hadleDelete(data.id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </Button>
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
