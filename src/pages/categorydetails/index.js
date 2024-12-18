import React from "react";

import Details from "./categoryDetails";
// import BusinessUpdate from "./businessupdate";
// import FreeEstimation from "./freeestimates";
// import DetailsReview from "./details.review";

import { Row, Col } from "react-bootstrap";

const CategoryDetails = () => {
  return (
    <div id="categoryDetails">
      <Row>
        {/* <Col lg={9} sm={12} md={8}>
          <Row>
            <div className="p-4 border rounded-lg shadow-lg max-w-xl mx-auto" style={{marginTop:"7rem"}}>
              <Col lg={12} sm={12} md={12}>
                <Details />
              </Col>
              <Col lg={12} sm={12} md={12}>
                <BusinessUpdate />
              </Col>
            </div>

            <Col lg={12} sm={12} md={12}>
              <DetailsReview />
            </Col>
          </Row>
        </Col> */}

        <Col lg={3} sm={12} md={4}>
          <Row>
            <Col lg={12} sm={12} md={12} style={{marginTop:"3rem"}}>
              <img
                src="/blog deals page.jpg"
                style={{ marginTop: "5rem", width: "100%" }}
              />
            </Col>

            {/* <Col lg={12} sm={12} md={12} style={{marginTop:"3rem"}}>
              <FreeEstimation />
            </Col> */}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default CategoryDetails;
