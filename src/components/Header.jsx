import React from "react";
import logo from "../assets/logo.png";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="light" fixed="top" className="shadow">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {" "}
          <img src={logo} alt="Logo" className="logo" />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
