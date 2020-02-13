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
import "../../styles/css/ProductsPage.css";

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
  name: string;
  description: string;
  price: string;
  status: boolean;
  Images: { url: string }[];
  Brand: { id: number; name: string };
}

export const Products: React.FC = () => {
  const [products, setProducts] = useState<TableData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(10);

  useEffect(() => {
    async function loadproducts() {
      const { data } = await api.get("/api/products");
      console.log("DATA ", data);
      setProducts(data);
    }
    loadproducts();
  }, []);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
    data: any
  ) {
    event.preventDefault();
    const arr = [];
    const response = await api.get(`/api/products/${data}`);
    arr.push(response.data);

    setProducts(arr);
  }

  const [showFeedback, setShowFeedback] = useState(false);

  const [feedbackData, setFeedbackData] = useState<alertValues>({
    message: "",
    variant: "success"
  });

  // Get current posts

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currenProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  //Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const [ShowAddProdModal, setShowAddProdModal] = useState(false);
  console.log(products);
  return (
    <>
      <AddProductModal
        show={ShowAddProdModal}
        setFeedbackData={setFeedbackData}
        setProducts={setProducts}
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
            onSubmit={handleSubmit}
            showAddModal={setShowAddProdModal}
          />
        </Col>
      </Row>

      <Row className="rowMinHeight">
        <Col sm={12}>
          <Table
            values={currenProducts}
            setFeedbackData={setFeedbackData}
            setShowFeedback={setShowFeedback}
            setProducts={setProducts}
          />
        </Col>
      </Row>

      <Row>
        <Col sm={12}>
          <Pagination
            productsPerPage={productsPerPage}
            totalproducts={products.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </Col>
      </Row>
    </>
  );
};

export default Products;
