import React, { useState } from "react";

import DeleteModal from "../DeleteModal";
import UpdateProductModal from "../UpdateStockModal";
import { Table, Badge, Button } from "react-bootstrap";

interface TableData {
  id: number;
  quantity: number;
  id_product: number;
  Products: {
    name: string;
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
  setStock: React.Dispatch<React.SetStateAction<TableData[]>>;
}

const ProductsTable: React.FC<Props> = ({
  values,
  setFeedbackData,
  setShowFeedback,
  setStock
}) => {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [stockId, setStockId] = useState<number | null>(null);
  const [productId, setProductId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  function hadleDelete(id: number) {
    setDeleteId(id);
    setShowDeleteModal(true);
  }

  function hadleUpdate(stockId: number, productId: number) {
    setStockId(stockId);
    setProductId(productId);
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
        setStock={setStock}
      />
      <UpdateProductModal
        stockId={stockId}
        show={showUpdateModal}
        setShow={setShowUpdateModal}
        setFeedbackData={setFeedbackData}
        setShowFeedback={setShowFeedback}
        setStock={setStock}
        productId={productId}
      />

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
            <th scope="col">Product</th>
            <th scope="col">Quantity </th>
            <th scope="col">Update </th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {values &&
            values.map(data => (
              <tr key={data.id}>
                <th scope="row">{data.id}</th>
                <td>{`#${data.id_product} ${data.Products.name}`}</td>
                <td style={{ width: "40%" }}>{data.quantity}</td>

                <td>
                  <p>
                    <Button
                      active
                      variant="primary"
                      onClick={() => hadleUpdate(data.id, data.id_product)}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </Button>
                  </p>
                </td>
                {console.log(data)}
                <td>
                  <p>
                    <Button
                      active
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

export default ProductsTable;
