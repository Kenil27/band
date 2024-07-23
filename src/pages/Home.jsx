import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Container className="d-flex justify-content-center vh-100">
      <Link to="/search">
        <Button variant="primary">Search for Students</Button>
      </Link>
    </Container>
  );
};

export default HomePage;
