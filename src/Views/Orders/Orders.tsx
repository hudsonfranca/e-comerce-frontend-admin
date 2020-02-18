import React, { useEffect, useState } from "react";
import api from "../../services/Api";
import { Table, Pagination, Searchinput, AlertFeedback } from "./components";
import { Row, Col } from "react-bootstrap";
import "../../styles/css/ordersPage.css";

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

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<TableData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [ordersPerPage] = useState<number>(10);

  useEffect(() => {
    async function loadOrders() {
      const { data } = await api.get("/api/orders/index");

      setOrders(data.rows);
    }
    loadOrders();
  }, []);

  // Get current posts
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstCustomer = indexOfLastOrder - ordersPerPage;
  const currenOrders = orders.slice(indexOfFirstCustomer, indexOfLastOrder);

  //Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const [showFeedback, setShowFeedback] = useState(false);

  const [feedbackData, setFeedbackData] = useState<alertValues>({
    message: "",
    variant: "success"
  });

  return (
    <>
      <Row>
        <Col sm={12}>
          <AlertFeedback
            variant={feedbackData.variant}
            setShow={setShowFeedback}
            show={showFeedback}
          >
            {feedbackData.message}
          </AlertFeedback>
        </Col>
      </Row>

      <Row>
        <Col sm={12}>
          <Searchinput
            setFeedbackData={setFeedbackData}
            setOrders={setOrders}
            setShowFeedback={setShowFeedback}
            orders={orders}
          />
        </Col>
      </Row>

      <Row className="rowMinHeight">
        <Col sm={12}>
          <Table
            values={currenOrders}
            setFeedbackData={setFeedbackData}
            setShowFeedback={setShowFeedback}
            setOrders={setOrders}
          />
        </Col>
      </Row>

      <Row>
        <Col sm={12}>
          <Pagination
            ordersPerPage={ordersPerPage}
            totalOrders={orders.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </Col>
      </Row>
    </>
  );
};

export default Orders;
