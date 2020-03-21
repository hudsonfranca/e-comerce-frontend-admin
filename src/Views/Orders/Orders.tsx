import React, { useEffect, useState } from "react";
import api from "../../services/Api";
import { Table, ToolsBar, AlertFeedback } from "./components";
import { Row, Col } from "react-bootstrap";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import CssBaseline from "@material-ui/core/CssBaseline";
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

const theme = createMuiTheme();

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<TableData[]>([]);

  const [offset, setOffset] = useState(0);

  const [TotalOrders, setTotalOrders] = useState(0);

  function handleClickPagination(offset: number) {
    setOffset(offset);
  }

  async function loadOrders() {
    try {
      const { data } = await api.get("/api/orders/index", {
        params: {
          offset,
          limit: 10
        }
      });
      if (data) {
        setOrders(data.rows);
        setTotalOrders(data.count);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

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
          <ToolsBar
            setFeedbackData={setFeedbackData}
            setOrders={setOrders}
            setShowFeedback={setShowFeedback}
            orders={orders}
          />
        </Col>
      </Row>

      <Row className="row_Table_Orders_MinHeight">
        <Col sm={12}>
          <Table
            values={orders}
            setFeedbackData={setFeedbackData}
            setShowFeedback={setShowFeedback}
            setOrders={setOrders}
            loadOrders={loadOrders}
          />
        </Col>
      </Row>

      <Row>
        <Col className="col_Orders_Pagination" sm={12}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Pagination
              limit={10}
              offset={offset}
              total={TotalOrders}
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

export default Orders;
