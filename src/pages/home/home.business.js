import React from "react";
import { Row, Col, Container } from "react-bootstrap";

const HomeBusiness = () => {
  return (
    <div style={{ backgroundColor: "#F2F2F2"}} className="d-flex py-4 justify-content-center align-items-center">
       <Container  >
       <Row className="text-center g-4 align-items-center">
        <Col xs={12} md={7} className="">
          <h3 className="mb-0">
            Featured Business
          </h3>
        </Col>
        <Col xs={12} md={5} className="d-flex justify-content-center align-items-center">
          <button className="business-button-header">
            Get Started
          </button>
        </Col>
      </Row>
       </Container>
    </div>
  );
}

export default HomeBusiness;
