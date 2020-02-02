import React from "react";
import "../../styles/css/Main.css";
import { Container, Row, Col } from "react-bootstrap";

interface Props {
  children: JSX.Element | null;
}

const Main: React.FC<Props> = ({ children }) => {
  return (
    <Container fluid className=" mt-1">
      <Row className="justify-content-md-center ">
        <Col sm={12}>{children}</Col>
      </Row>
    </Container>
  );
};

export default Main;
