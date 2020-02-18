import React from "react";
import "../../styles/css/Navbar.css";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {}

const CustoNavbar: React.FC<Props> = () => {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="primary"
        variant="dark"
        fixed="top"
      >
        <Navbar.Brand href="#home">
          <i className="fas fa-users-cog"></i> ADMIN
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/customers" className="nav-link">
              Customers
            </Link>
            <Link to="/products" className="nav-link">
              Products
            </Link>
            <Link to="/" className="nav-link">
              Orders
            </Link>
            <Link to="/stock" className="nav-link">
              Stock
            </Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">
              <i className="fas fa-sign-out-alt"></i> Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default CustoNavbar;
