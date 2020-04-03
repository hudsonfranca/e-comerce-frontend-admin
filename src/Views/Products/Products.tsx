import React, { useEffect, useState, useContext } from "react";
import api from "../../services/Api";
import {
  Table,
  SearchAddBar,
  AlertFeedback,
  AddProductModal
} from "./components";
import { navbarContext } from "../../NavbarContext";
import { Row, Col } from "react-bootstrap";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import CssBaseline from "@material-ui/core/CssBaseline";
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
  Images: {
    image: string;
    id: number;
    id_product: number;
    aspect_ratio: string;
  }[];
  Brand: { id: number; name: string };
  Categories: { id: number; name: string };
}

const theme = createMuiTheme();

export const Products: React.FC = () => {
  const { setShowNavItems } = useContext(navbarContext);

  useEffect(() => {
    setShowNavItems(true);
    document.title = "Products";
  }, []);

  const [products, setProducts] = useState<TableData[]>([]);
  const [offset, setOffset] = useState(0);

  const [TotalProducts, setTotalProducts] = useState(0);

  function handleClickPagination(offset: number) {
    setOffset(offset);
  }

  async function loadproducts() {
    const { data } = await api.get(`/api/products/${offset}/${10}`);

    if (data) {
      setProducts(data.rows);
      setTotalProducts(data.count);
    }
  }

  useEffect(() => {
    loadproducts();
  }, [offset]);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
    data: any
  ) {
    event.preventDefault();
    const arr = [];
    const response = await api.get(`/api/products/${data}`);
    if (response.data) {
      arr.push(response.data);

      setProducts(arr);
    }
  }

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
        setShow={setShowAddProdModal}
        setShowFeedback={setShowFeedback}
        loadproducts={loadproducts}
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

      <Row className="row_Table_Products_MinHeight">
        <Col sm={12}>
          <Table
            values={products}
            setFeedbackData={setFeedbackData}
            setShowFeedback={setShowFeedback}
            setProducts={setProducts}
            loadproducts={loadproducts}
          />
        </Col>
      </Row>

      <Row>
        <Col sm={12} className="col_products_Pagination">
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

export default Products;
