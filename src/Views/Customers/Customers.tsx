import React, { useEffect, useState } from "react";
import api from "../../services/Api";
import { Table, Pagination, Searchinput, AlertFeedback } from "./components";
import { Row, Col } from "react-bootstrap";
import "../../styles/css/CustomersPage.css";

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

interface Addresses {
  street_address: string;
  city: string;
  zip: string;
  country: string;
  state: string;
}

interface TableData {
  id: number;
  first_name: string;
  last_name: string;
  email_address: string;
  cpf: string;
  phone_number: string;
  createdAt: string;
  Addresses: Addresses[];
}

export const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<TableData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [customersPerPage] = useState<number>(10);

  useEffect(() => {
    async function loadCustomers() {
      const { data } = await api.get("/api/customer");

      setCustomers(data);
    }
    loadCustomers();
  }, []);

  // Get current posts
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currenCustomers = customers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  //Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
    data: any
  ) {
    event.preventDefault();
    const response = await api.get(`/api/customer/search?name=${data}`);

    setCustomers(response.data);
  }

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
          <Searchinput onSubmit={handleSubmit} />
        </Col>
      </Row>

      <Row className="rowMinHeight">
        <Col sm={12}>
          <Table
            values={currenCustomers}
            setFeedbackData={setFeedbackData}
            setShowFeedback={setShowFeedback}
            setCustomers={setCustomers}
          />
        </Col>
      </Row>

      <Row>
        <Col sm={12}>
          <Pagination
            customersPerPage={customersPerPage}
            totalCustomers={customers.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </Col>
      </Row>
    </>
  );
};

export default Customers;
