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
  id_customers: number;
  id_payment_methods: number;
  status: "Completed" | "On hold" | "Pending payment" | "Processing";
  amount: string;
  created_at: string;
  Products: {
    id: number;
    name: string;
    price: string;
    description: string;
    status: boolean;
    Images: {
      image: string;
      small: string;
      id: number;
      id_product: number;
      aspect_ratio: string;
    }[];
    orders_products: {
      quantity: number;
    };
  }[];
  OrdersAddresse: {
    id: number;
    street_address: string;
    city: string;
    zip: string;
    country: string;
    state: string;
  };
  Customers: {
    id: number;
    User: {
      id: number;
      first_name: string;
      last_name: string;
      email_address: string;
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
  loadOrders: () => void;
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
  setOrders,
  loadOrders
}) => {
  const handleChangeStatus = async (status: statusType, idOrder: number) => {
    if (status === "Delete") {
      try {
        await api.delete(`/api/orders/${idOrder}`);
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
            values.map((data: TableData) => (
              <tr key={data.id}>
                <th scope="row">{`#${data.id} ${data.Customers.User.first_name} ${data.Customers.User.last_name}`}</th>
                <td>{moment(data.created_at).format("DD/MM/YYYY")}</td>
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
                <td>{`${data.OrdersAddresse.street_address}, ${data.OrdersAddresse.city}, ${data.OrdersAddresse.state}, ${data.OrdersAddresse.state}`}</td>
                <td>${data.amount}</td>
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
