import React, { useState, useEffect } from "react";
import moment from "moment";
import api from "../../../../services/Api";

import { ListGroup, Modal, Table } from "react-bootstrap";

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

interface Props {
  values: TableData | null;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const ViewModal: React.FC<Props> = ({ show, setShow, values }) => {
  return (
    <Modal
      size="lg"
      show={show}
      onHide={() => setShow(false)}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{`Order #${values?.id}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          <ListGroup.Item>
            <strong>Status:</strong> {values?.status}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Total: </strong> ${values?.amount}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Date: </strong>
            {moment(values?.created_at).format("DD/MM/YYYY")}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Customer: </strong>
            {`${values?.Customers.User.first_name} ${values?.Customers.User.last_name}`}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong> Ship to: </strong>
            {`${values?.OrdersAddresse.street_address}, ${values?.OrdersAddresse.city}, ${values?.OrdersAddresse.state}, ${values?.OrdersAddresse.country}, CEP ${values?.OrdersAddresse.zip}`}
          </ListGroup.Item>
          <ListGroup.Item className="text-center">
            <strong>Products</strong>
          </ListGroup.Item>
        </ListGroup>
        <Table striped bordered hover size="sm" responsive>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {values?.Products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default ViewModal;
