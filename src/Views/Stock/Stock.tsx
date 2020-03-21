import React, { useEffect, useState } from "react";
import api from "../../services/Api";
import {
  Table,
  SearchAddBar,
  AlertFeedback,
  AddProductModal
} from "./components";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import CssBaseline from "@material-ui/core/CssBaseline";
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
  id: number;
  quantity: number;
  id_product: number;
  Products: {
    name: string;
  };
}

const theme = createMuiTheme();

export const Stock: React.FC = () => {
  const [stock, setStock] = useState<TableData[]>([]);

  const [offset, setOffset] = useState(0);

  const [totalStocks, setTotalStocks] = useState(0);

  function handleClickPagination(offset: number) {
    setOffset(offset);
  }

  useEffect(() => {
    async function loadStock() {
      try {
        const { data } = await api.get("/api/stock", {
          params: {
            offset,
            limit: 2
          }
        });

        if (data) {
          setStock(data.rows);
          setTotalStocks(data.count);
        }
      } catch (err) {
        console.log(err);
      }
    }
    loadStock();
  }, [offset]);

  const [showFeedback, setShowFeedback] = useState(false);

  const [feedbackData, setFeedbackData] = useState<alertValues>({
    message: "",
    variant: "success"
  });

  const [ShowAddProdModal, setShowAddProdModal] = useState(false);

  return (
    <>
      <AddProductModal
        show={ShowAddProdModal}
        setFeedbackData={setFeedbackData}
        setStock={setStock}
        setShow={setShowAddProdModal}
        setShowFeedback={setShowFeedback}
      />
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
          <SearchAddBar
            setStock={setStock}
            showAddModal={setShowAddProdModal}
          />
        </Col>
      </Row>

      <Row className="col_stock_MinHeight ">
        <Col sm={12}>
          <Table
            values={stock}
            setFeedbackData={setFeedbackData}
            setShowFeedback={setShowFeedback}
            setStock={setStock}
          />
        </Col>
      </Row>

      <Row>
        <Col className="col_stock_Pagination " sm={12}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Pagination
              limit={2}
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
