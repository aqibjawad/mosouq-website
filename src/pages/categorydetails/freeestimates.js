import React from "react";

import { Row, Col } from "react-bootstrap";

import "./index.css"

const FreeEstimation = () => {
  return (
    <div className="p-4 border rounded-lg shadow-lg max-w-xl mx-auto">
        <Row>
            <Col lg={2} md={2} sm={6}>
                <img src="/watch-descrp.png" />
            </Col>

            <Col lg={10} md={10} sm={6} className="mt-2" >
                <div className="esti-head">
                    Free Estimation
                </div>
            </Col>
        </Row>

        <div className="esti-button">
            Call for details
        </div>
    </div>
  );
};

export default FreeEstimation;
