import React, { useEffect, useState, useContext } from "react";
import api from "../../services/Api";
import { navbarContext } from "../../NavbarContext";
import { Table, Searchinput, AlertFeedback } from "./components";
import { Row, Col } from "react-bootstrap";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import CssBaseline from "@material-ui/core/CssBaseline";
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
  id: number;
  street_address: string;
  city: string;
  zip: string;
  country: string;
  state: string;
}

interface TableData {
  id: number;
  User: {
    first_name: string;
    last_name: string;
    email_address: string;
    cpf: string;
    phone_number: string;
    createdAt: string;
    Addresses: Addresses;
  };
}

const theme = createMuiTheme();

interface Props {}

export const Customers: React.FC<Props> = ({}) => {
  const { setShowNavItems } = useContext(navbarContext);

  useEffect(() => {
    setShowNavItems(true);
    document.title = "Customers";
  }, []);

  const [customers, setCustomers] = useState<TableData[]>([]);
  const [offset, setOffset] = useState(0);

  const [TotalProducts, setTotalProducts] = useState(0);

  function handleClickPagination(offset: number) {
    setOffset(offset);
  }

  async function loadCustomers() {
    const { data } = await api.get("/api/customer", {
      params: {
        offset,
        limit: 10
      }
    });
    if (data) {
      setCustomers(data.rows);
      setTotalProducts(data.count);
    }
  }

  useEffect(() => {
    loadCustomers();
  }, [offset]);

  const [showFeedback, setShowFeedback] = useState(false);

  const [feedbackData, setFeedbackData] = useState<alertValues>({
    message: "",
    variant: "success"
  });

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
    id: number
  ) {
    event.preventDefault();

    try {
      const response = await api.get(`/api/customer/${id}/show`);
      if (response.data) {
        const customerArray = [response.data];
        setCustomers(customerArray);
      } else {
        setFeedbackData({
          message: "Try a different search id.",
          variant: "warning"
        });
        setShowFeedback(true);
      }
    } catch (err) {
      setFeedbackData({
        message: "Try a different search id.",
        variant: "warning"
      });
      setShowFeedback(true);
    }
  }

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
            values={customers}
            setFeedbackData={setFeedbackData}
            setShowFeedback={setShowFeedback}
            loadCustomers={loadCustomers}
          />
        </Col>
      </Row>

      <Row>
        <Col className="rowPagination" sm={12}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Pagination
              limit={10}
              offset={offset}
              total={TotalProducts}
              onClick={(e, offset) => handleClickPagination(offset)}
              size="large"
              otherPageColor="primary"
            />
          </MuiThemeProvider>
        </Col>
      </Row>
    </>
  );
};

export default Customers;
