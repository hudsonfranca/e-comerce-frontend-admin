import React, { useState, useReducer } from "react";
import ViewModal from "../ViewModal";
import moment from "moment";
import api from "../../../../services/Api";

import {
  Table,
  Button,
  DropdownButton,
  ButtonGroup,
  Dropdown,
  Badge
} from "react-bootstrap";

interface TableData {
  id: number;
  status: "Completed" | "On hold" | "Pending payment" | "Processing";
  Sale: {
    id: number;
    id_customers: number;
    id_payment_methods: number;
    amount: string;
    created_at: string;
    Products: {
      id: string;
      name: string;
      brand_id: number;
      description: string;
    }[];
    Customers: {
      first_name: string;
      last_name: string;
      email_address: string;
      Addresses: {
        id: number;
        street_address: string;
        city: string;
        zip: string;
        country: string;
        state: string;
      }[];
    };
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
  setOrders: React.Dispatch<React.SetStateAction<TableData[]>>;
}

type statusType =
  | "Completed"
  | "On hold"
  | "Pending payment"
  | "Processing"
  | "Delete";

const CustomerTable: React.FC<Props> = ({
  values,
  setFeedbackData,
  setShowFeedback,
  setOrders
}) => {
  async function loadOrders() {
    const { data } = await api.get("/api/orders/index");
    setOrders(data.rows);
  }

  const handleChangeStatus = async (status: statusType, idOrder: number) => {
    if (status === "Delete") {
      try {
        await api.delete(`/api/order/${idOrder}/delete`);
        loadOrders();
      } catch (err) {
        setFeedbackData({
          message: "It was not possible to delete this order.",
          variant: "danger"
        });
        setShowFeedback(true);
      }
    } else {
      try {
        await api.put(`/api/order/${idOrder}/edit`, {
          status
        });
        loadOrders();
      } catch (err) {
        setFeedbackData({
          message: "The status could not be updated.",
          variant: "danger"
        });
        setShowFeedback(true);
      }
    }
  };

  const [showViewModal, setShowViewModal] = useState(false);
  const [viewOrders, setViewOrders] = useState<TableData | null>(null);

  async function loadViewOrders(orderId: number) {
    const { data } = await api.get(`/api/orders/${orderId}/show`);
    setViewOrders(data);
  }

  return (
    <>
      <ViewModal
        show={showViewModal}
        setShow={setShowViewModal}
        values={viewOrders}
      />
      <Table striped bordered responsive="sm" size="sm">
        <thead>
          <tr>
            <th scope="col">Order</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Ship To</th>
            <th scope="col">Total</th>
            <th scope="col">Actions</th>
            <th scope="col">View</th>
          </tr>
        </thead>
        <tbody>
          {values &&
            values.map(data => (
              <tr key={data.id}>
                <th scope="row">{`#${data.id} ${data.Sale.Customers.first_name} ${data.Sale.Customers.last_name}`}</th>
                <td>{moment(data.Sale.created_at).format("DD/MM/YYYY")}</td>
                <td>
                  {data.status === "Completed" ? (
                    <Badge variant="success">
                      <h6>Completed</h6>
                    </Badge>
                  ) : (
                    ""
                  )}
                  {data.status === "On hold" ? (
                    <Badge variant="warning">
                      <h6>On hold</h6>
                    </Badge>
                  ) : (
                    ""
                  )}

                  {data.status === "Processing" ? (
                    <Badge variant="info">
                      <h6>Processing</h6>
                    </Badge>
                  ) : (
                    ""
                  )}

                  {data.status === "Pending payment" ? (
                    <Badge variant="danger">
                      <h6>Pending payment</h6>
                    </Badge>
                  ) : (
                    ""
                  )}
                </td>
                <td>{`${data.Sale.Customers.Addresses[0].street_address}, ${data.Sale.Customers.Addresses[0].city}, ${data.Sale.Customers.Addresses[0].state}, ${data.Sale.Customers.Addresses[0].country}`}</td>
                <td>{data.Sale.amount}</td>
                <td>
                  <ButtonGroup style={{ width: "100%" }}>
                    <DropdownButton
                      as={ButtonGroup}
                      title="
                    Change status"
                      id="bg-nested-dropdown"
                    >
                      <Dropdown.Item
                        eventKey="1"
                        onClick={() => handleChangeStatus("Completed", data.id)}
                      >
                        Completed
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey="2"
                        onClick={() =>
                          handleChangeStatus("Pending payment", data.id)
                        }
                      >
                        Pending payment
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey="3"
                        onClick={() =>
                          handleChangeStatus("Processing", data.id)
                        }
                      >
                        Processing
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey="4"
                        onClick={() => handleChangeStatus("On hold", data.id)}
                      >
                        On hold
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey="5"
                        onClick={() => handleChangeStatus("Delete", data.id)}
                      >
                        Delete
                      </Dropdown.Item>
                    </DropdownButton>
                  </ButtonGroup>
                </td>
                <td>
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() => {
                      loadViewOrders(data.id);
                      setShowViewModal(true);
                    }}
                  >
                    <i className="fas fa-eye"></i>
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default CustomerTable;
