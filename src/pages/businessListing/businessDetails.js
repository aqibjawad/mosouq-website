import React from "react";

import { Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";

const BusinessDetails = () => {
  return (
    <div>
      <Row>
        <Col lg={6} md={6} sm={12}>
          <Row>
            <Col lg={2} md={2} sm={12}>
              <div className="business-detail-btn">Save</div>
            </Col>

            <Col lg={2} md={2} sm={12}>
              <div className="business-detail-btn">Share</div>
            </Col>

            <Col lg={3} md={2} sm={12}>
              <div className="business-detail-btn">Add Reviews</div>
            </Col>

            <Col lg={3} md={2} sm={12}>
              <div className="business-detail-btn">Total Views</div>
            </Col>

            <Col lg={2} md={2} sm={12}>
              <div className="business-detail-btn">Report/Claim</div>
            </Col>
          </Row>

          <div>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <div className="details-business">Description & Details</div>
              </Col>

              <Col lg={6} md={6} sm={12}>
                <Row>
                  <Col>
                    <div>Last Updated:</div>
                  </Col>
                  <Col>
                    <div className="business-date">January 2024</div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

          <div>
            <div className="other-info">Other Informaiton:</div>

            <div className="other-info-descrp">
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content. Lorem ipsum may
              be used as a placeholder before the final copy is available.
              Wikipedia
            </div>
          </div>
        </Col>

        <Col lg={6} md={6} sm={12}>
          <div className="business-location-sec">
            <div className="location">
              Chakwal Choa Saidan Shah Pindadan Khan Rd, Pind Dadan Khan,
              Jhelum, Punjab
            </div>

            <div className="webandemail">
              <Row>
                <Col lg={6}>
                  <Link>Website</Link>
                </Col>

                <Col lg={6}>Email</Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BusinessDetails;
