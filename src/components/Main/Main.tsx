import React from "react";
import "../../styles/css/Main.css";
import { Container } from "react-bootstrap";

interface Props {
  children: JSX.Element | null;
}

const Main: React.FC<Props> = ({ children }) => {
  return (
    <Container fluid className=" mt-1" id="MainContainer">
      {children}
    </Container>
  );
};

export default Main;
