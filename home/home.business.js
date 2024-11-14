import React from "react";
import { Row, Col } from "react-bootstrap";

const HomeBusiness = () => {
  return (
    <div style={{ backgroundColor: "#F2F2F2", height: "90px" }} className="d-flex justify-content-center align-items-center">
      <Row className="w-100 text-center">
        <Col style={{marginLeft:"15rem"}} xs={12} md={6} className="d-flex justify-content-center align-items-center">
          <h2 className="mb-0">
            Featured Business?
          </h2>
        </Col>
        <Col style={{marginLeft:"-25rem"}} xs={12} md={6} className="d-flex justify-content-center align-items-center">
          <button className="business-button-header">
            Get Started
          </button>
        </Col>
      </Row>
    </div>
  );
}

export default HomeBusiness;
