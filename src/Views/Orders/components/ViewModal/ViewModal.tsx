import React, { useState, useEffect } from "react";
import moment from "moment";
import api from "../../../../services/Api";

import { ListGroup, Modal, Table } from "react-bootstrap";

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
            <strong>Total: </strong> {values?.Sale.amount}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Date: </strong>
            {moment(values?.Sale.created_at).format("DD/MM/YYYY")}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Customer: </strong>
            {`${values?.Sale.Customers.first_name} ${values?.Sale.Customers.last_name}`}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong> Ship to: </strong>
            {`${values?.Sale.Customers.Addresses[0].street_address}, ${values?.Sale.Customers.Addresses[0].city}, ${values?.Sale.Customers.Addresses[0].state}, ${values?.Sale.Customers.Addresses[0].country}, CEP ${values?.Sale.Customers.Addresses[0].zip}`}
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
            {values?.Sale.Products.map(product => (
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
