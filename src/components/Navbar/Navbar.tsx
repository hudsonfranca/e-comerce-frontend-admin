import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { navbarContext } from "../../NavbarContext";
import "../../styles/css/Navbar.css";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {}

const CustoNavbar: React.FC<Props> = () => {
  const { showNavItems } = useContext(navbarContext);
  const history = useHistory();

  const logout = () => {
    sessionStorage.removeItem("authorization");
    sessionStorage.removeItem("id");
    history.push("/");
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="primary"
        variant="dark"
        fixed="top"
      >
        <Navbar.Brand>
          <i className="fas fa-users-cog"></i> ADMIN
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {showNavItems && (
            <>
              <Nav className="mr-auto">
                <Link to="/customers" className="nav-link">
                  Customers
                </Link>
                <Link to="/products" className="nav-link">
                  Products
                </Link>
                <Link to="/orders" className="nav-link">
                  Orders
                </Link>
                <Link to="/stock" className="nav-link">
                  Stock
                </Link>
              </Nav>
              <Nav>
                <Button onClick={logout}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </Button>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default CustoNavbar;
