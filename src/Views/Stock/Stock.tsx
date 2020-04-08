import React, { useEffect, useState, useContext } from "react";
import api from "../../services/Api";
import { Table, SearchBar, AlertFeedback } from "./components";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import CssBaseline from "@material-ui/core/CssBaseline";
import { navbarContext } from "../../NavbarContext";
import { Row, Col } from "react-bootstrap";
import "../../styles/css/stockPage.css";

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
  name: string;
  Stock: {
    id: number;
    quantity: number;
    id_product: number;
  };
}

const theme = createMuiTheme();

export const Stock: React.FC = () => {
  const { setShowNavItems } = useContext(navbarContext);

  useEffect(() => {
    setShowNavItems(true);
    document.title = "Stock";
  }, []);

  const [stock, setStock] = useState<TableData[]>([]);

  const [offset, setOffset] = useState(0);

  const [totalStocks, setTotalStocks] = useState(0);

  function handleClickPagination(offset: number) {
    setOffset(offset);
  }

  async function loadStock() {
    try {
      const { data } = await api.get(`/api/stock`, {
        params: {
          offset,
          limit: 10,
        },
      });

      if (data) {
        setStock(data.rows);
        setTotalStocks(data.count);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadStock();
  }, [offset]);

  const [showFeedback, setShowFeedback] = useState(false);

  const [feedbackData, setFeedbackData] = useState<alertValues>({
    message: "",
    variant: "success",
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
          <SearchBar setStock={setStock} />
        </Col>
      </Row>

      <Row className="col_stock_MinHeight ">
        <Col sm={12}>
          <Table
            values={stock}
            setFeedbackData={setFeedbackData}
            setShowFeedback={setShowFeedback}
            loadStock={loadStock}
          />
        </Col>
      </Row>

      <Row>
        <Col className="col_stock_Pagination " sm={12}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Pagination
              limit={10}
              offset={offset}
              total={totalStocks}
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

export default Stock;
