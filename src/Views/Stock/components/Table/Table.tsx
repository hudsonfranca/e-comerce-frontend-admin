import React, { useState } from "react";

import UpdateProductModal from "../UpdateStockModal";
import { Table, Button } from "react-bootstrap";

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
  values: TableData[] | null;
  setShowFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  setFeedbackData: React.Dispatch<React.SetStateAction<alertValues>>;
  loadStock: () => void;
}

const ProductsTable: React.FC<Props> = ({
  values,
  setFeedbackData,
  setShowFeedback,
  loadStock
}) => {
  const [stockId, setStockId] = useState<number | null>(null);
  const [productId, setProductId] = useState<number | null>(null);

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  function hadleUpdate(stockId: number, productId: number) {
    setStockId(stockId);
    setProductId(productId);
    setShowUpdateModal(true);
  }

  return (
    <>
      <UpdateProductModal
        loadAllStock={loadStock}
        stockId={stockId}
        show={showUpdateModal}
        setShow={setShowUpdateModal}
        setFeedbackData={setFeedbackData}
        setShowFeedback={setShowFeedback}
        productId={productId}
      />

      <Table
        striped
        bordered
        responsive
        size="sm"
        style={{ overflowX: "auto" }}
      >
        <thead>
          <tr>
            <th scope="col">Stock id</th>
            <th scope="col">Product id</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity </th>
            <th scope="col">Update </th>
          </tr>
        </thead>
        <tbody>
          {values &&
            values.map(data => (
              <tr key={data.Stock.id}>
                <th scope="row">{data.Stock.id}</th>
                <td>{data.Stock.id_product}</td>
                <td>{`${data.name}`}</td>
                <td>{data.Stock.quantity}</td>

                <td>
                  <p>
                    <Button
                      active
                      variant="primary"
                      onClick={() =>
                        hadleUpdate(data.Stock.id, data.Stock.id_product)
                      }
                    >
                      <i className="fas fa-pencil-alt"></i>
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
