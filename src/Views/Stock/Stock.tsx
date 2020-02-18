import React, { useEffect, useState } from "react";
import api from "../../services/Api";
import {
  Table,
  Pagination,
  SearchAddBar,
  AlertFeedback,
  AddProductModal
} from "./components";
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

export const Stock: React.FC = () => {
  const [stock, setStock] = useState<TableData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [stockPerPage] = useState<number>(10);

  useEffect(() => {
    async function loadStock() {
      const { data } = await api.get("/api/stock");

      setStock(data);
    }
    loadStock();
  }, []);

  const [showFeedback, setShowFeedback] = useState(false);

  const [feedbackData, setFeedbackData] = useState<alertValues>({
    message: "",
    variant: "success"
  });

  // Get current posts

  const indexOfLastProduct = currentPage * stockPerPage;
  const indexOfFirstProduct = indexOfLastProduct - stockPerPage;
  const currenstock = stock.slice(indexOfFirstProduct, indexOfLastProduct);

  //Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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

      <Row className="rowMinHeight">
        <Col sm={12}>
          <Table
            values={currenstock}
            setFeedbackData={setFeedbackData}
            setShowFeedback={setShowFeedback}
            setStock={setStock}
          />
        </Col>
      </Row>

      <Row>
        <Col sm={12}>
          <Pagination
            stockPerPage={stockPerPage}
            totalStock={stock.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </Col>
      </Row>
    </>
  );
};

export default Stock;
